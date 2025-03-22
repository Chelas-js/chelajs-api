import { Module } from "@nestjs/common";
import { JobOfferController } from "./job-offert.controller";

@Module({
  controllers: [JobOfferController],
})
export class JobOfferModule {}
