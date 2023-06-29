import {
  Body,
  Controller,
  Get,
  Patch,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/current')
  @UseGuards(new AuthGuard())
  findOne(@Session() session: SessionContainer) {
    const userId = session.getAccessTokenPayload().sub;
    return this.usersService.findOne(userId);
  }

  @Get()
  @UseGuards(new AuthGuard())
  async findAll(@Session() session: SessionContainer) {
    const userId = session.getAccessTokenPayload().sub;
    return this.usersService.findAll(userId);
  }

  @Patch()
  @UseGuards(new AuthGuard())
  async update(
    @Body() updateProfileDto: UpdateProfileDto,
    @Session() session: SessionContainer,
  ) {
    const userId = session.getAccessTokenPayload().sub;
    return this.usersService.update(updateProfileDto, userId);
  }
}
