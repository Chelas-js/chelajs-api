import { Access } from "src/constants/access.enum";

import { z } from "zod";

export const CreateOfferSchema = z.object({
  offer_id: z.string(),
  title: z.string().nonempty(),
  expiration: z.string().datetime(),
  body: z.string(),
  labels: z.array(z.string()),
  target: z.string().url(),
  access: z.nativeEnum(Access),
});

export type CreateOfferDTO = z.infer<typeof CreateOfferSchema>;
