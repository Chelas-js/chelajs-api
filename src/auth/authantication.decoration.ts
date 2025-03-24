import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import type { IncomingMessage } from "http";

export const Authantication = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: IncomingMessage = context.switchToHttp().getRequest();
    // @ts-ignore
    const decodedToken: DecodedIdToken = request.auth;
    if (!decodedToken) throw new UnauthorizedException("Invalid token");
    return decodedToken;
  },
);

export const authanticationTokensMap = new WeakMap<
  IncomingMessage,
  DecodedIdToken
>();
