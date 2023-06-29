import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { FavoriteContactModule } from './favorite-contact/favorite-contact.module';
import { MeetingModule } from './meeting/meeting.module';
import { RtcModule } from './rtc/rtc.module';
import { RtmModule } from './rtm/rtm.module';

@Module({
  imports: [
    AuthModule.forRoot(),
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    FavoriteContactModule,
    MeetingModule,
    RtcModule,
    RtmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
