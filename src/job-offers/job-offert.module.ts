import { Module } from "@nestjs/common";
import { JobOfferController } from "./job-offert.controller";
import { JobOfferService } from "./job-offert.service";
import { JobOfferRepository } from "./job-offert.repository";
import { AuthModule } from "src/auth/auth.module";
import { AuthGuard } from "src/auth/auth.guard";

@Module({
  controllers: [JobOfferController],
  providers: [JobOfferService, JobOfferRepository],
})
export class JobOfferModule {}
