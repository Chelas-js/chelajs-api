import { Module } from "@nestjs/common";
import { JobOfferController } from "./job-offert.controller.js";
import { JobOfferService } from "./job-offert.service.js";
import { JobOfferRepository } from "./job-offert.repository.js";

@Module({
  controllers: [JobOfferController],
  providers: [JobOfferService, JobOfferRepository],
})
export class JobOfferModule {}
