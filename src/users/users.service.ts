import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findAll(userId: string) {
    return this.prisma.user.findMany({
      where: { id: { not: userId } },
    });
  }

  update(updateProfileDto: UpdateProfileDto, userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        nickname: updateProfileDto.nickname,
        picture: updateProfileDto.picture,
      },
    });
  }
}
