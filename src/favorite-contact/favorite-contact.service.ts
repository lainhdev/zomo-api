import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateFavoriteContactDto } from './dto/create-favorite-contact.dto';

@Injectable()
export class FavoriteContactService {
  constructor(private prismaService: PrismaService) {}
  create(
    createFavoriteContactDto: CreateFavoriteContactDto,
    authUserId: string,
  ) {
    return this.prismaService.favoriteContact.create({
      data: {
        userId: createFavoriteContactDto.favoriteUserId,
        authorId: authUserId,
      },
      include: {
        contact: true,
        createdBy: true,
      },
    });
  }

  findAll(authUserId: string) {
    return this.prismaService.favoriteContact.findMany({
      where: { createdBy: { id: authUserId } },
      include: {
        contact: true,
        createdBy: true,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.favoriteContact.delete({
      where: { id },
      include: {
        contact: true,
        createdBy: true,
      },
    });
  }
}
