import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log(`${req.method} cats${req.url} is called!`);
    console.log(`request body : ${JSON.stringify(req.body)}`);
    next();
  }
}
