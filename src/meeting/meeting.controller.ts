import { AuthGuard } from './../auth/auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Session,
} from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { SessionContainer } from 'supertokens-node/recipe/session';

@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post()
  @UseGuards(new AuthGuard())
  create(
    @Body() createMeetingDto: CreateMeetingDto,
    @Session() session: SessionContainer,
  ) {
    const authUserId = session.getAccessTokenPayload().sub;
    return this.meetingService.create(createMeetingDto, authUserId);
  }

  @Get()
  @UseGuards(new AuthGuard())
  findAll(@Session() session: SessionContainer) {
    const authUserId = session.getAccessTokenPayload().sub;
    return this.meetingService.findAll(authUserId);
  }

  @Get(':id')
  @UseGuards(new AuthGuard())
  findOne(@Param('id') id: string) {
    return this.meetingService.findOne(id);
  }

  @Patch(':id/join')
  @UseGuards(new AuthGuard())
  joinMeeting(@Param('id') id: string, @Session() session: SessionContainer) {
    const authUserId = session.getAccessTokenPayload().sub;
    return this.meetingService.joinMeeting(id, authUserId);
  }

  @Patch(':id')
  @UseGuards(new AuthGuard())
  update(@Param('id') id: string, @Body() updateMeetingDto: UpdateMeetingDto) {
    return this.meetingService.update(id, updateMeetingDto);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  remove(@Param('id') id: string, @Session() session: SessionContainer) {
    const authUserId = session.getAccessTokenPayload().sub;
    return this.meetingService.remove(id, authUserId);
  }
}
