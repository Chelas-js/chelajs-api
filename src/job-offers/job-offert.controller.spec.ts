import { describe, it, expect, mock } from "bun:test";
import { JobOfferController } from "./job-offert.controller";
import request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { JobOfferService } from "./job-offert.service";

describe("JobOfferController", () => {
  let app: INestApplication | null = null;
  const jobOfferService = {
    createOffer: mock(),
    listOffers: mock(),
    describeOffer: mock(),
    deleteOffer: mock(),
  };

  describe(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [JobOfferController],
      providers: [JobOfferService],
    })
      .overrideProvider(JobOfferService)
      .useValue(jobOfferService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it("should create a job offer", async () => {
    const res = await request(app!.getHttpServer())
      .put("/job_offers/01")
      .send({
        title: "foo",
        expiration: new Date(Date.UTC(2025, 1, 1, 4, 45, 23, 110)).toJSON(),
        body: "# title",
        labels: [],
        target: "http://example.com/01",
        access: "public",
      });

    expect(res.status).toEqual(201);
    expect(jobOfferService.createOffer).toBeCalled();
  });

  it("should list all job offers", async () => {
    const res = await request(app!.getHttpServer()).get("/job_offers");

    expect(res.status).toEqual(200);
    expect(jobOfferService.listOffers).toBeCalled();
  });

  it("should describe a job offer", async () => {
    const res = await request(app!.getHttpServer()).get("/job_offers/01");

    expect(res.status).toEqual(200);
    expect(jobOfferService.describeOffer).toBeCalled();
  });

  it("should return 404 if offer not found", async () => {
    jobOfferService.describeOffer.mockResolvedValueOnce(null);
    const res = await request(app!.getHttpServer()).get("/job_offers/01");

    expect(res.status).toEqual(404);
    expect(jobOfferService.describeOffer).toBeCalled();
  });

  it("should delete a job offer", async () => {
    const res = await request(app!.getHttpServer()).delete("/job_offers/01");

    expect(res.status).toEqual(204);
    expect(jobOfferService.deleteOffer).toBeCalled();
  });
});
