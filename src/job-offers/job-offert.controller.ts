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
} from "@nestjs/common";
import { JobOfferService } from "./job-offert.service";
import { CreateOfferSchema } from "./dtos/create-offert.dto";

@Controller("/job_offers")
export class JobOfferController {
  constructor(private jobOfferService: JobOfferService) {}

  @Put("/:offerId")
  @HttpCode(HttpStatus.CREATED)
  async createOffer(
    @Param("offerId")
    offerId: string,
    @Body()
    body: any,
  ) {
    const createOffer = CreateOfferSchema.parse({ ...body, offer_id: offerId });
    return await this.jobOfferService.createOffer(createOffer);
  }

  @Get()
  async listOfferts() {
    return await this.jobOfferService.listOffers();
  }

  @Get("/:offerId")
  async describeOffer(
    @Param("offerId")
    offerId: string,
  ) {
    const offer = await this.jobOfferService.describeOffer(offerId);
    if (offer === null) throw new NotFoundException("Offer not found");
    return offer;
  }

  @Delete("/:offerId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOffer(
    @Param("offerId")
    offerId: string,
  ) {
    await this.jobOfferService.deleteOffer(offerId);
  }
}
