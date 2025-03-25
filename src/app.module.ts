import { DynamicModule, Module } from "@nestjs/common";
import { JobOfferModule } from "./job-offers/job-offert.module";
import { ConfigModule } from "@nestjs/config";
import { configuration } from "./config/configuration";
import { AuthModule } from "./auth/auth.module";
import { ParticipantsModule } from "./participants/participants.module";
import { KnowTokenController } from "./know-token/know-token.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule.forGlobal(),
    JobOfferModule,
    ParticipantsModule,
  ],
  controllers: [KnowTokenController],
})
export class AppModule {}
