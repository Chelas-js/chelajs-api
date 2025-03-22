import { Module } from "@nestjs/common";
import { JobOfferController } from "./job-offert.controller";
import { JobOfferService } from "./job-offert.service";

@Module({
  controllers: [JobOfferController],
  providers: [JobOfferService],
})
export class JobOfferModule {}
