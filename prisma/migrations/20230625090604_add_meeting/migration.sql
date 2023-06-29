-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MeetingsOnUsers" (
    "meetingId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,

    CONSTRAINT "MeetingsOnUsers_pkey" PRIMARY KEY ("meetingId","participantId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_id_key" ON "Meeting"("id");

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingsOnUsers" ADD CONSTRAINT "MeetingsOnUsers_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingsOnUsers" ADD CONSTRAINT "MeetingsOnUsers_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
