import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept( context: ExecutionContext, next: CallHandler<any>): Observable<any> {

    // console.log('Before...');

    const request = context.switchToHttp().getRequest();
    // console.log(context.getHandler().name);
    console.log(`${request.method} ${request.url}`);
    console.log(`request body : ${JSON.stringify(request.body)}`);

    // const now = Date.now();
    return next
      .handle()
      // .pipe(map(data => ({data})));
      // .pipe(tap(() => console.log(`After...${Date.now() - now}ms`)));
  }
}
