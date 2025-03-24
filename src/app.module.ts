import { DynamicModule, Module } from "@nestjs/common";
import { JobOfferModule } from "./job-offers/job-offert.module";
import { ConfigModule } from "@nestjs/config";
import { configuration } from "./config/configuration";
import { AuthModule } from "./auth/auth.module";
import { ParticipantsModule } from "./participants/participants.module";

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
})
export class AppModule {}
