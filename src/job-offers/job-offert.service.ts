import {
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Put,
} from "@nestjs/common";
import { CreateOfferDTO } from "./dtos/create-offert.dto.js";
import { OfferDTO } from "./dtos/offert.dto.js";
import { JobOfferRepository } from "./job-offert.repository.js";

class AuthorCannotReplateExistentDocumentError extends Error {
  constructor(
    readonly createdBy: string,
    readonly authorId: string,
    message: string,
  ) {
    super(message);
  }
}

class HiddenAccessError extends Error {}

@Injectable()
export class JobOfferService {
  constructor(private jobOfferRepository: JobOfferRepository) {}

  async setOffer(
    createOffer: CreateOfferDTO,
    createdBy: string,
  ): Promise<OfferDTO> {
    const doc = await this.jobOfferRepository.describeOffer(
      createOffer.offer_id,
    );

    if (doc && doc.createdBy !== createdBy) {
      throw new AuthorCannotReplateExistentDocumentError(
        doc.createdBy,
        createdBy,
        "Invalid user",
      );
    }

    return this.jobOfferRepository.setOffer({
      ...createOffer,
      craetedAt: new Date().toJSON(),
      createdBy: createdBy,
    });
  }

  async listOffers(
    continueToken?: string,
  ): Promise<{ data: OfferDTO[]; nextToken?: string }> {
    return this.jobOfferRepository.listOffers(continueToken);
  }

  async describeOffer(
    offerId: string,
    visitorId: string,
  ): Promise<OfferDTO | null> {
    const doc = await this.jobOfferRepository.describeOffer(offerId);

    if (doc && doc.access === "private" && doc.createdBy !== visitorId) {
      throw new HiddenAccessError(`Offer ${offerId} is private`);
    }

    return doc;
  }

  async deleteOffer(offerId: string, visitorId: string) {
    const doc = await this.jobOfferRepository.describeOffer(offerId);

    if (doc === null) return;

    if (doc.createdBy !== visitorId) {
      throw new HiddenAccessError(`Offer ${offerId} is private`);
    }

    await this.jobOfferRepository.deleteOffer(offerId);
  }
}
