import { Injectable } from "@nestjs/common";
import { Firestore } from "firebase-admin/firestore";
import { EventDTO } from "./dtos/event.dto.js";
import { ConfigurationDTO } from "../config/dtos/configuration.dto.js";
import { ConfigService } from "@nestjs/config";
import { PaginationDTO } from "../dtos/pagination.dto.js";

@Injectable()
export class EventsRepository {
  private readonly firestore: Firestore;
  eventsCollection: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >;

  constructor(configService: ConfigService<ConfigurationDTO>) {
    this.firestore = new Firestore({
      databaseId: configService.get("databaseId"),
    });
    this.eventsCollection = this.firestore.collection("events");
  }

  async updateEvent(body: EventDTO): Promise<EventDTO> {
    await this.eventsCollection.doc(body.eventId).set(body);
    return body;
  }

  async describeEvent(eventId: string): Promise<EventDTO | null> {
    const doc = await this.eventsCollection.doc(eventId).get();
    if (!doc.exists) return null;
    return doc.data() as EventDTO;
  }

  async listEvents(): Promise<PaginationDTO<EventDTO>> {
    const snapshot = await this.eventsCollection.get();
    return { data: snapshot.docs.map((doc) => doc.data() as EventDTO) };
  }

  async deleteEvent(eventId: string): Promise<void> {
    await this.eventsCollection.doc(eventId).delete();
  }
}
