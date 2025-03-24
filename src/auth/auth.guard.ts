import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import type { IncomingMessage } from "node:http";
import { AuthService } from "./auth.service";
import { result, get } from "@jondotsoy/utils-js";
import { authanticationTokensMap } from "./authantication.decoration";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IncomingMessage = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization?.split(" ");
    const authenticationType = authorization?.at(0);
    const idToken = authorization?.at(1);

    if (!authorization || authenticationType !== "Bearer" || !idToken)
      throw new UnauthorizedException("Invalid token");

    const [error, decodedToken] = await result(() =>
      this.authService.verifyIdToken(idToken),
    );

    if (error && get.string(error, "code") === "auth/id-token-expired") {
      throw new UnauthorizedException("Invalid token");
    }

    // @ts-ignore
    request.auth = decodedToken;
    authanticationTokensMap.set(request, decodedToken!);
    AuthService.updateDecodedToken(this.authService, idToken, decodedToken!);

    return true;
  }
}
