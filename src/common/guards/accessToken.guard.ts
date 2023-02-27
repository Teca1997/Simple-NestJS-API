import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log('info');
    console.log(info);
    console.log('err');
    console.log(err);

    if (!user) {
      if (err !== null) {
        throw new UnauthorizedException(err);
      }
      throw new UnauthorizedException(info);
    }
    return user;
  }
}
