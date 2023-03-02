import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { blueBright, cyan, green, greenBright, redBright, white, yellow } from 'colorette';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const args = context.getArgs()[0];
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            green(`[API] - `) +
              `${new Date(now).toLocaleString()}    ` +
              this.colorOutputMethod(args.method) +
              white(`${args.url} `) +
              yellow(`+${Date.now() - now}ms`),
          ),
        ),
      );
  }

  colorOutputMethod(method: string) {
    switch (method) {
      case 'POST':
        return greenBright(`${method} `);
      case 'GET':
        return blueBright(`${method} `);
      case 'PATCH':
        return cyan(`${method} `);
      case 'DELETE':
        return redBright(`${method} `);
    }
  }
}
