import { Controller, Get, Header, Res } from "@nestjs/common";
import { createReadStream } from "fs";

@Controller(".know-token")
export class KnowTokenController {
  @Get()
  @Header("Content-Type", "text/html")
  async knowToken(@Res() res: any) {
    createReadStream("know-token.html").pipe(res);
  }
}
