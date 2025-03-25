import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import { ZodType as ZodSchema } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { success, error } = this.schema.safeParse(value);
    if (success === false)
      throw new BadRequestException(`Validation failed: ${error.message}`, {
        cause: error,
      });
    return value;
  }
}
