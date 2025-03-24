import { Injectable, Scope } from "@nestjs/common";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { FirebaseAdminService } from "./firebaseAdmin.service";

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  #decodedToken: null | DecodedIdToken = null;
  #idToken: null | string = null;

  constructor(private readonly firebaseAdminService: FirebaseAdminService) {}

  get decodedToken() {
    return this.#decodedToken;
  }
  get idToken() {
    return this.#idToken;
  }

  static updateDecodedToken(
    instance: AuthService,
    idToken: string,
    decodedToken: DecodedIdToken,
  ) {
    instance.#decodedToken = decodedToken;
  }

  async verifyIdToken(idToken) {
    return this.firebaseAdminService.auth.verifyIdToken(idToken);
  }
}
