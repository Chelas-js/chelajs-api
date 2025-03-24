import { DynamicModule, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { FirebaseAdminService } from "./firebaseAdmin.service";

@Module({})
export class AuthModule {
  static forGlobal(): DynamicModule {
    return {
      global: true,
      module: AuthModule,
      providers: [FirebaseAdminService, AuthService],
      exports: [FirebaseAdminService, AuthService],
    };
  }
}
