import { DynamicModule, Module } from "@nestjs/common";
import { JobOfferModule } from "./job-offers/job-offert.module.js";
import { ConfigModule } from "@nestjs/config";
import { configuration } from "./config/configuration.js";
import { AuthModule } from "./auth/auth.module.js";
import { ParticipantsModule } from "./participants/participants.module.js";
import { KnowTokenController } from "./know-token/know-token.controller.js";
import { EventsModule } from "./events/events.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule.forGlobal(),
    JobOfferModule,
    ParticipantsModule,
    EventsModule,
  ],
  controllers: [KnowTokenController],
})
export class AppModule {}
