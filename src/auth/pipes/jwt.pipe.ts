import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtValidationPipe implements PipeTransform {
  constructor(private jwtService: JwtService) {}
  transform(value: any, metadata: ArgumentMetadata): any {
    try {
      const result = this.jwtService.verify(value, {
        secret: process.env.JWT_SECRET_ACCESS?.trim() || 'secret_key',
        ignoreExpiration: false,
      });
      return result;
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        throw new NotAcceptableException('Token malformed');
      } else if (err instanceof TokenExpiredError) {
        throw new BadRequestException('Token expired');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
