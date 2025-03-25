import { Module } from "@nestjs/common";
import { JobOfferController } from "./job-offert.controller";
import { JobOfferService } from "./job-offert.service";
import { JobOfferRepository } from "./job-offert.repository";

@Module({
  controllers: [JobOfferController],
  providers: [JobOfferService, JobOfferRepository],
})
export class JobOfferModule {}
