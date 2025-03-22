import { describe, it, expect } from "bun:test";
import { JobOfferController } from "./job-offert.controller";
import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { Body, INestApplication } from "@nestjs/common";

describe("JobOfferController", () => {
  let app: INestApplication | null = null;

  describe(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [JobOfferController],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it("should create a job offer", async () => {
    await request(app!.getHttpServer())
      .put("/job_offers/01")
      .send({
        title: "foo",
        expiration: new Date(Date.UTC(2025, 1, 1, 4, 45, 23, 110)).toJSON(),
        Body: "# title",
        labels: [],
        target: "http://example.com/01",
        access: "public",
      });
  });
});
