import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Session,
} from '@nestjs/common';
import { FavoriteContactService } from './favorite-contact.service';
import { CreateFavoriteContactDto } from './dto/create-favorite-contact.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';

@Controller('favorite-contact')
export class FavoriteContactController {
  constructor(
    private readonly favoriteContactService: FavoriteContactService,
  ) {}

  @Post()
  @UseGuards(new AuthGuard())
  create(
    @Body() createFavoriteContactDto: CreateFavoriteContactDto,
    @Session() session: SessionContainer,
  ) {
    const authUserId = session.getAccessTokenPayload().sub;
    return this.favoriteContactService.create(
      createFavoriteContactDto,
      authUserId,
    );
  }

  @Get()
  @UseGuards(new AuthGuard())
  findAll(@Session() session: SessionContainer) {
    const authUserId = session.getAccessTokenPayload().sub;
    return this.favoriteContactService.findAll(authUserId);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  remove(@Param('id') id: string) {
    return this.favoriteContactService.remove(id);
  }
}
