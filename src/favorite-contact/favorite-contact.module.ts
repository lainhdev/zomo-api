import { Module } from '@nestjs/common';
import { FavoriteContactService } from './favorite-contact.service';
import { FavoriteContactController } from './favorite-contact.controller';

@Module({
  controllers: [FavoriteContactController],
  providers: [FavoriteContactService],
})
export class FavoriteContactModule {}
