import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import type { EventDTO } from "./dtos/event.dto.js";
import { CreateEventDTO, CreateEventSchema } from "./dtos/create-event.dto.js";
import { ZodValidationPipe } from "../participants/ZodValidationPipe.js";
import { EventsService } from "./events.service.js";
import { AuthGuard } from "../auth/auth.guard.js";
import { Authantication } from "../auth/authantication.decoration.js";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier.js";
import { PaginationDTO } from "../dtos/pagination.dto.js";

@Controller("/events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Put(":eventId")
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async updateEvent(
    @Param("eventId")
    eventId: string,
    @Body(new ZodValidationPipe(CreateEventSchema))
    body: CreateEventDTO,
    @Authantication()
    decodedToken: DecodedIdToken,
  ): Promise<EventDTO> {
    const event = await this.eventsService.describeEvent(eventId);

    if (event && event.createdBy !== decodedToken.uid)
      throw new UnauthorizedException(
        `You are not authorized to update this event`,
      );

    return this.eventsService.updateEvent({
      ...body,
      eventId: eventId,
      createdAt: new Date().toJSON(),
      createdBy: decodedToken.uid,
    });
  }

  @Get(":eventId")
  async describeEvent(
    @Param("eventId")
    eventId: string,
  ): Promise<EventDTO> {
    const event = await this.eventsService.describeEvent(eventId);

    if (event === null)
      throw new NotFoundException(`Event with id ${eventId} not found`);

    return event;
  }

  @Get()
  async listEvents(): Promise<PaginationDTO<EventDTO>> {
    return this.eventsService.listEvents();
  }

  @Delete(":eventId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEvent(
    @Param("eventId") eventId: string,
    @Authantication()
    decodedToken: DecodedIdToken,
  ): Promise<void> {
    const event = await this.eventsService.describeEvent(eventId);

    if (event === null) return;

    if (event.createdBy !== decodedToken.uid)
      throw new UnauthorizedException(
        `You are not authorized to delete this event`,
      );

    await this.eventsService.deleteEvent(eventId);
  }
}
