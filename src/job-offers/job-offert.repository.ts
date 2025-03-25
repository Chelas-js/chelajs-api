import { Injectable } from "@nestjs/common";
import { OfferDTO } from "./dtos/offert.dto.js";
import { Firestore } from "@google-cloud/firestore";
import { ConfigService } from "@nestjs/config";
import { ConfigurationDTO } from "../config/dtos/configuration.dto.js";

@Injectable()
export class JobOfferRepository {
  private readonly firestore: Firestore;
  jobOffersCollections: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >;

  constructor(readonly configService: ConfigService<ConfigurationDTO>) {
    this.firestore = new Firestore({
      databaseId: configService.get("databaseId"),
    });
    this.jobOffersCollections = this.firestore.collection("job_offers");
  }

  async setOffer(offer: OfferDTO): Promise<OfferDTO> {
    const doc = this.jobOffersCollections.doc(offer.offer_id);
    await doc.set(offer);
    return offer;
  }

  async listOffers(
    continueToken?: string,
  ): Promise<{ data: OfferDTO[]; nextToken?: string }> {
    const refs = await this.jobOffersCollections
      .orderBy("craetedAt")
      // .startAfter(continueToken)
      .limit(30)
      .get();
    return {
      data: refs.docs.map((doc) => doc.data() as OfferDTO),
    };
  }

  async describeOffer(offerId: string): Promise<OfferDTO | null> {
    const doc = await this.jobOffersCollections.doc(offerId).get();
    if (!doc.exists) return null;
    return doc.data() as OfferDTO;
  }

  deleteOffer(offerId: string) {
    return this.jobOffersCollections.doc(offerId).delete();
  }
}
