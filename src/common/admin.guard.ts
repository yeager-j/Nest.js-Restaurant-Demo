import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.getArgs()[0].user['http://localhost:3000/roles'] || '';

    return user.indexOf('admin') > -1;
  }
}
