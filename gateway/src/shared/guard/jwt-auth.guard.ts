import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorator/is-public.decorator';
import { IS_ADMIN_KEY } from '../decorator/is-admin.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const authorization = request.headers['authorization'];
    if (!authorization) {
      return false;
    }

    const token = authorization.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;

      const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isAdmin && decoded.role !== 'admin') {
        return false;
      }

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
