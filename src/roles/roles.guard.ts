import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(requiredRoles);

    if (!requiredRoles) {
      return true;
    }
    const request = await context.switchToHttp().getRequest();
    console.log(request);

    //return requiredRoles.includes(user.role);
    return true;
  }
}
