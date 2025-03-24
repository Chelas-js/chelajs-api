import { Module } from "@nestjs/common";
import { ParticipantsService } from "./participants.service";
import { ParticipantsRepository } from "./participants.repository";

@Module({
  providers: [ParticipantsRepository, ParticipantsService],
})
export class ParticipantsModule {}
