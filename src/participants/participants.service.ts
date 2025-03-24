import { Injectable } from "@nestjs/common";
import { ParticipantsRepository } from "./participants.repository";
import { ParticipantDTO } from "./dtos/participant.dto";

export class HiddenParticipantError extends Error {}

@Injectable({})
export class ParticipantsService {
  constructor(
    private readonly participantsRepository: ParticipantsRepository,
  ) {}

  async setParticipant(
    uid: string,
    data: Pick<ParticipantDTO, Exclude<keyof ParticipantDTO, "uid">>,
  ) {
    const participant = await this.participantsRepository.getParticipant(uid);
    if (participant && participant.uid !== uid)
      throw new HiddenParticipantError(``);
    return await this.participantsRepository.setParticipant({ uid, ...data });
  }

  describeParticipan(uid: string) {
    return this.participantsRepository.getParticipant(uid);
  }

  async listParticipants() {
    return this.participantsRepository.listParticipants();
  }
}
