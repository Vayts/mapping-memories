import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ERRORS } from '../constants/errors';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        return Promise.reject();
      }
      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET || 'access',
      });
      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: ERRORS.NOT_AUTHORIZED });
    }
  }
}
