import { Access } from "../../constants/access.enum.js";
import { z } from "zod";

export const EventSchema = z.object({
  eventId: z.string(),
  name: z.string(),
  body: z.string().describe("markdown format"),
  cover: z.string().url().optional(),
  date: z.string().datetime(),
  access: z.nativeEnum(Access).optional(),
  createdAt: z.string().datetime(),
  createdBy: z.string(),
});

export type EventDTO = z.infer<typeof EventSchema>;
