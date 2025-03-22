import { Controller, Delete, Get, Param, Put } from "@nestjs/common";
import { JobOfferService } from "./job-offert.service";

@Controller("/job_offers")
export class JobOfferController {
  constructor(private jobOfferService: JobOfferService) {}

  @Put("/:offerId")
  createOffer(
    @Param("offerId")
    offerId: string,
  ) {}

  @Get()
  listOfferts() {}

  @Get("/:offerId")
  describeOffer(
    @Param("offerId")
    offerId: string,
  ) {}

  @Delete("/:offerId")
  deleteOffer(
    @Param("offerId")
    offerId: string,
  ) {}
}
