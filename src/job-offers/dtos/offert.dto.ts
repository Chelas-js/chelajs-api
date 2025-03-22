import { Access } from "src/constants/access.enum";
import { z } from "zod";

export const OfferSchema = z.object({
  offer_id: z.string(),
  title: z.string(),
  expiration: z.string(),
  body: z.string(),
  labels: z.array(z.string()),
  target: z.string(),
  access: z.nativeEnum(Access),
  craetedAt: z.string(),
  createdBy: z.string(),
});

export type OfferDTO = z.infer<typeof OfferSchema>;
