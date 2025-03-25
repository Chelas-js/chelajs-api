import { z } from "zod";
import { ParticipantSchema } from "./participant.dto.js";

export const RequestParticipantSchema = ParticipantSchema.pick({
  name: true,
  bio: true,
  labels: true,
  country: true,
  social: true,
});

export type RequestParticipantDTO = z.infer<typeof RequestParticipantSchema>;
