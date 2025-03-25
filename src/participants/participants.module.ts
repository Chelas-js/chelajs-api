import { Module } from "@nestjs/common";
import { ParticipantsService } from "./participants.service";
import { ParticipantsRepository } from "./participants.repository";
import { ParticipantsController } from "./participants.controller";

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsRepository, ParticipantsService],
})
export class ParticipantsModule {}
