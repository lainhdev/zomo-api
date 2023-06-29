import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import ThirdParty from 'supertokens-node/recipe/thirdparty';
import Dashboard from 'supertokens-node/recipe/dashboard';
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupertokensService {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    supertokens.init({
      appInfo: {
        appName: configService.get('APP_NAME'),
        apiDomain: configService.get('API_DOMAIN'),
        websiteDomain: configService.get('WEBSITE_DOMAIN'),
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
      supertokens: {
        connectionURI: configService.get('SUPERTOKENS_CONNECTION_URI'),
        apiKey: configService.get('SUPERTOKENS_API_KEY'),
      },
      recipeList: [
        Session.init(),
        Dashboard.init(),
        ThirdPartyEmailPassword.init({
          providers: [
            ThirdParty.Google({
              clientId: configService.get('GOOGLE_CLIENT_ID'),
              clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            }),
            ThirdParty.Github({
              clientId: configService.get('GITHUB_CLIENT_ID'),
              clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
            }),
            ThirdParty.Facebook({
              clientSecret: configService.get('FACEBOOK_CLIENT_SECRET'),
              clientId: configService.get('FACEBOOK_CLIENT_ID'),
            }),
          ],
          signUpFeature: { formFields: [{ id: 'nickname' }] },
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                emailPasswordSignUpPOST: async function (input) {
                  if (
                    originalImplementation.emailPasswordSignUpPOST === undefined
                  ) {
                    throw Error('Should never come here');
                  }

                  // First we call the original implementation of signUpPOST.
                  const response =
                    await originalImplementation.emailPasswordSignUpPOST(input);

                  // Post sign up response, we check if it was successful
                  if (response.status === 'OK') {
                    const formFields = input.formFields;
                    const nickname = formFields.find(
                      (field) => field.id === 'nickname',
                    );
                    await prisma.user.create({
                      data: {
                        nickname: nickname.value,
                        email: response.user.email,
                        id: response.user.id,
                        provider: 'emailpassword',
                      },
                    });
                  }
                  return response;
                },
                // override the thirdparty sign in / up API
                thirdPartySignInUpPOST: async function (input) {
                  if (
                    originalImplementation.thirdPartySignInUpPOST === undefined
                  ) {
                    throw Error('Should never come here');
                  }

                  // TODO: Some pre sign in / up logic
                  const response =
                    await originalImplementation.thirdPartySignInUpPOST(input);

                  if (response.status === 'OK') {
                    if (response.createdNewUser) {
                      const nickname = response.user.email?.split('@')[0];
                      await prisma.user.create({
                        data: {
                          nickname,
                          email: response.user.email,
                          id: response.user.id,
                          provider: response.user.thirdParty.id,
                        },
                      });
                    } else {
                      // TODO: some post sign in logic
                    }
                  }

                  return response;
                },
              };
            },
          },
        }),
      ],
    });
  }
}
