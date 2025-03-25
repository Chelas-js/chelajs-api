import { Firestore } from "@google-cloud/firestore";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ConfigurationDTO } from "../config/dtos/configuration.dto";
import { ParticipantDTO } from "./dtos/participant.dto";

@Injectable({})
export class ParticipantsRepository {
  firestore: Firestore;
  participantsCollections: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >;

  constructor(configService: ConfigService<ConfigurationDTO>) {
    this.firestore = new Firestore({
      databaseId: configService.get("databaseId"),
    });
    this.participantsCollections = this.firestore.collection("job_offers");
  }

  async setParticipant(participant: ParticipantDTO) {
    await this.participantsCollections.doc(participant.uid).set(participant);
    return participant;
  }

  async getParticipant(uid: string) {
    const doc = await this.participantsCollections.doc(uid).get();
    if (!doc.exists) {
      return null;
    }
    return doc.data() as ParticipantDTO;
  }

  async listParticipants() {
    const docs = await this.participantsCollections
      .orderBy("updatedAt")
      .limit(30)
      .get();

    return {
      data: docs.docs.map((doc) => doc.data() as ParticipantDTO),
    };
  }

  async deleteParticipant(uid: string) {
    await this.participantsCollections.doc(uid).delete();
    return true;
  }
}
