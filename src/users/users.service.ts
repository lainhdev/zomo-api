import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
