import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type * as admin from "firebase-admin";
import { ConfigurationDTO } from "./dtos/configuration.dto";

@Injectable()
export class FirebaseAdminService {
  app: admin.app.App;
  auth: admin.auth.Auth;

  constructor(readonly configService: ConfigService<ConfigurationDTO>) {
    this.app = configService.get("firebaseApp")!;
    this.auth = this.app.auth();
  }
}
