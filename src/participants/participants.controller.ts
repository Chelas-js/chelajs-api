import {
  ArgumentMetadata,
  Body,
  Controller,
  Injectable,
  Param,
  PipeTransform,
  Put,
  BadRequestException,
  UseGuards,
  Get,
  NotFoundException,
} from "@nestjs/common";
import { ParticipantDTO } from "./dtos/participant.dto";
import {
  RequestParticipantDTO,
  RequestParticipantSchema,
} from "./dtos/request-participant.dto";
import { ParticipantsService } from "./participants.service";
import { AuthGuard } from "../auth/auth.guard";
import { Authantication } from "src/auth/authantication.decoration";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { ZodSchema } from "zod";

@Injectable()
class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { success, error } = this.schema.safeParse(value);
    if (success === false)
      throw new BadRequestException(`Validation failed: ${error.message}`, {
        cause: error,
      });
    return value;
  }
}

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
