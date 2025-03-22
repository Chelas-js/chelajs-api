import { Module } from '@nestjs/common';
import { JobOfferModule } from './job-offers/job-offert.module';

@Module({
    imports: [JobOfferModule]
})
export class AppModule {}
