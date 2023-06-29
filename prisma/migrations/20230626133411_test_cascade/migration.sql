-- DropForeignKey
ALTER TABLE "Meeting" DROP CONSTRAINT "Meeting_userId_fkey";

-- DropForeignKey
ALTER TABLE "MeetingsOnUsers" DROP CONSTRAINT "MeetingsOnUsers_meetingId_fkey";

-- DropForeignKey
ALTER TABLE "MeetingsOnUsers" DROP CONSTRAINT "MeetingsOnUsers_participantId_fkey";

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingsOnUsers" ADD CONSTRAINT "MeetingsOnUsers_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingsOnUsers" ADD CONSTRAINT "MeetingsOnUsers_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
