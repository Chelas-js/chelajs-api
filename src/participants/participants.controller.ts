import {
  Body,
  Controller,
  Param,
  Put,
  UseGuards,
  Get,
  NotFoundException,
} from "@nestjs/common";
import { ParticipantDTO } from "./dtos/participant.dto.js";
import {
  RequestParticipantDTO,
  RequestParticipantSchema,
} from "./dtos/request-participant.dto.js";
import { ParticipantsService } from "./participants.service.js";
import { AuthGuard } from "../auth/auth.guard.js";
import { Authantication } from "../auth/authantication.decoration.js";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { ZodValidationPipe } from "./ZodValidationPipe.js";

export class HiddenParticipantError extends Error {}

@Controller("/participants")
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Put()
  @UseGuards(AuthGuard)
  async setParticipant(
    @Authantication()
    decodedIdToken: DecodedIdToken,
    @Body(new ZodValidationPipe(RequestParticipantSchema))
    data: RequestParticipantDTO,
  ) {
    const participant: ParticipantDTO = {
      ...data,
      uid: decodedIdToken.uid,
      updatedAt: new Date().toJSON(),
    };

    return this.participantsService.setParticipant(
      decodedIdToken.uid,
      participant,
    );
  }

  @Get(":participantId")
  @UseGuards(AuthGuard)
  async describeParticipant(
    @Param("participantId")
    participantId: string,
  ) {
    const participant =
      await this.participantsService.describeParticipant(participantId);

    if (participant === null)
      throw new NotFoundException(
        `Participant with id ${participantId} not found`,
      );

    return participant;
  }

  @Get()
  @UseGuards(AuthGuard)
  async listParticipant() {
    return this.participantsService.listParticipants();
  }
}
