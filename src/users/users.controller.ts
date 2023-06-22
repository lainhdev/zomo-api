import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(new AuthGuard())
  findOne(@Session() session: SessionContainer) {
    const userId = session.getAccessTokenPayload().sub;
    return this.usersService.findOne(userId);
  }
}
