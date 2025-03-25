import { Injectable } from "@nestjs/common";
import type { EventDTO } from "./dtos/event.dto.js";
import { EventsRepository } from "./events.repository.js";
import { PaginationDTO } from "src/dtos/pagination.dto.js";

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async updateEvent(body: EventDTO): Promise<EventDTO> {
    await this.eventsRepository.updateEvent(body);
    return body;
  }

  async describeEvent(eventId: string): Promise<EventDTO | null> {
    return this.eventsRepository.describeEvent(eventId);
  }

  async listEvents(): Promise<PaginationDTO<EventDTO>> {
    return this.eventsRepository.listEvents();
  }

  async deleteEvent(eventId: string): Promise<void> {
    await this.eventsRepository.deleteEvent(eventId);
  }
}
