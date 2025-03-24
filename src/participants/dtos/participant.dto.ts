import { z } from "zod";

export const ParticipantSchema = z.object({
  uid: z.string(),
  name: z.string(),
  bio: z.string(),
  labels: z.array(z.string()),
  country: z.string().nullable(),
  social: z
    .object({
      linkedin: z.string().url().nullable(),
      github: z.string().url().nullable(),
      twitter: z.string().url().nullable(),
      website: z.string().url().nullable(),
    })
    .nullable(),
  createdAt: z.string().datetime(),
});

export type ParticipantDTO = z.infer<typeof ParticipantSchema>;
