import { z } from "zod";
import { EventSchema } from "./event.dto.js";

export const CreateEventSchema = EventSchema.pick({
  name: true,
  body: true,
  cover: true,
  date: true,
  access: true,
});

export type CreateEventDTO = z.infer<typeof CreateEventSchema>;
