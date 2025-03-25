import { describe, it, expect, spyOn, beforeAll, mock, Mock } from "bun:test";
import { JobOfferController } from "./job-offert.controller";
import request from "supertest";
import { Test } from "@nestjs/testing";
import { Body, INestApplication } from "@nestjs/common";
import { JobOfferService } from "./job-offert.service";
import { Access } from "src/constants/access.enum";
import { JobOfferRepository } from "./job-offert.repository";

describe("JobOfferService", () => {
  let jobOfferService: JobOfferService | null = null;
  let jobOfferRepository: Partial<Record<keyof JobOfferRepository, Mock<any>>> =
    {
      setOffer: mock(),
    };

  beforeAll(() => {
    jobOfferService = new JobOfferService(jobOfferRepository as any);
  });

  it("should create a new offer", async () => {
    const newOffer = await jobOfferService!.setOffer({
      offer_id: "01",
      access: Access.public,
      body: "foo",
      expiration: new Date(Date.UTC(2025, 1, 1, 4, 45, 23, 110)).toJSON(),
      labels: [],
      target: "",
      title: "taz",
    });

    expect(jobOfferRepository.setOffer).toBeCalled();
  });
});
