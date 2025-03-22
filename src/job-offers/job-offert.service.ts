import {
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Put,
} from "@nestjs/common";
import { CreateOfferDTO } from "./dtos/create-offert.dto";
import { OfferDTO } from "./dtos/offert.dto";

@Injectable()
export class JobOfferService {
  createOffer(createOffer: CreateOfferDTO): Promise<OfferDTO> {
    throw new Error("Method not implemented.");
  }

  listOffers(): Promise<{ data: OfferDTO[] }> {
    throw new Error("Method not implemented.");
  }

  describeOffer(offerId: string): Promise<OfferDTO | null> {
    throw new Error("Method not implemented.");
  }

  deleteOffer(offerId: string) {
    throw new Error("Method not implemented.");
  }
}
