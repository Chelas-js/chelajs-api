import { z } from "zod";

export const ParticipantSchema = z.object({
  uid: z.string(),
  name: z.string(),
  bio: z.string().optional(),
  labels: z.array(z.string()),
  country: z.string().optional(),
  social: z
    .object({
      linkedin: z.string().url().optional(),
      github: z.string().url().optional(),
      twitter: z.string().url().optional(),
      website: z.string().url().optional(),
    })
    .optional(),
  updatedAt: z.string().datetime(),
});

export type ParticipantDTO = z.infer<typeof ParticipantSchema>;
