import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { customAlphabet } from 'nanoid';
@Injectable()
export class MeetingService {
  constructor(private prismaService: PrismaService) {}
  create(createMeetingDto: CreateMeetingDto, authUserId: string) {
    const nanoid = customAlphabet('0123456789', 11);
    return this.prismaService.meeting.create({
      data: {
        id: nanoid(),
        ...createMeetingDto,
        userId: authUserId,
        participants: {
          create: { participantId: authUserId },
        },
      },
      include: {
        createdBy: true,
        participants: true,
      },
    });
  }

  findAll(authUserId: string) {
    return this.prismaService.meeting.findMany({
      where: { participants: { some: { participantId: authUserId } } },
      include: {
        createdBy: true,
        participants: true,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.meeting.findUnique({
      where: { id },
      include: {
        createdBy: true,
        participants: true,
      },
    });
  }

  update(id: string, updateMeetingDto: UpdateMeetingDto) {
    return this.prismaService.meeting.update({
      where: { id },
      data: {
        participants: {
          create: {
            participantId: updateMeetingDto.participantId,
          },
        },
      },
      include: {
        createdBy: true,
        participants: true,
      },
    });
  }

  joinMeeting(id: string, authUserId: string) {
    return this.prismaService.meeting.update({
      where: { id },
      data: {
        participants: {
          create: {
            participantId: authUserId,
          },
        },
      },
      include: {
        createdBy: true,
        participants: true,
      },
    });
  }

  async remove(id: string, authUserId: string) {
    const meeting = await this.prismaService.meeting.findUnique({
      where: { id },
      include: {
        createdBy: true,
      },
    });
    if (authUserId !== meeting.userId) {
      throw new ForbiddenException('cannot remove');
    }
    return this.prismaService.meeting.delete({ where: { id } });
  }
}
