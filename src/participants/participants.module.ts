import { Module } from "@nestjs/common";
import { ParticipantsService } from "./participants.service.js";
import { ParticipantsRepository } from "./participants.repository.js";
import { ParticipantsController } from "./participants.controller.js";

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsRepository, ParticipantsService],
})
export class ParticipantsModule {}
