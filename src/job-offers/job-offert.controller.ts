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
  Query,
  UseGuards,
} from "@nestjs/common";
import { JobOfferService } from "./job-offert.service";
import { CreateOfferSchema } from "./dtos/create-offert.dto";
import { AuthGuard } from "../auth/auth.guard";
import { Authantication } from "src/auth/authantication.decoration";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

@Controller("/job_offers")
export class JobOfferController {
  constructor(private jobOfferService: JobOfferService) {}

  @Put("/:offerId")
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async setOffer(
    @Param("offerId")
    offerId: string,
    @Body()
    body: any,
    @Authantication()
    decodedToken: DecodedIdToken,
  ) {
    const createOffer = CreateOfferSchema.parse({ ...body, offer_id: offerId });
    return await this.jobOfferService.setOffer(createOffer, decodedToken.uid);
  }

  @Get()
  @UseGuards(AuthGuard)
  async listOfferts(
    @Query("continueToken") continueToken: string | undefined,
    @Authantication() decodedToken: DecodedIdToken,
  ) {
    return await this.jobOfferService.listOffers();
  }

  @Get("/:offerId")
  @UseGuards(AuthGuard)
  async describeOffer(
    @Param("offerId")
    offerId: string,
    @Authantication() decodedToken: DecodedIdToken,
  ) {
    const offer = await this.jobOfferService.describeOffer(
      offerId,
      decodedToken.uid,
    );
    if (offer === null) throw new NotFoundException("Offer not found");
    return offer;
  }

  @Delete("/:offerId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async deleteOffer(
    @Param("offerId")
    offerId: string,
    @Authantication() decodedToken: DecodedIdToken,
  ) {
    await this.jobOfferService.deleteOffer(offerId, decodedToken.uid);
  }
}
