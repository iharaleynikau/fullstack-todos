import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
      const token = authHeader.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('The user is not authorized.');
      }

      const user = this.jwtService.verify(token);

      req.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('The user is not authorized.');
    }
  }
}
