import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ERRORS } from '../constants/errors';
import mongoose from 'mongoose';
import { InvalidDataException } from '../exception/invalidData.exception';

@Injectable()
export class ValidPublicationIdGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { publication_id } = req.query;

    if (mongoose.isValidObjectId(publication_id)) {
      return true;
    }

    throw new InvalidDataException(ERRORS.INVALID_DATA);
  }
}
