import { Controller, Delete, Get, Param, Put } from "@nestjs/common";

@Controller("/job_offers")
export class JobOfferController {
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
