import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { LoggerMiddleware } from '../../middleware/logger.middleware';
import { logger } from '../../middleware/functional.logger.middleware';
import { globalLogger } from '../../middleware/global.middleware';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], // 이렇게 하면 다른 모듈에서 CatsModule 을 import 했을 때, CatsService 를 공유해서 사용할 수 있습니다.
})
export class CatsModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer
      // .apply(LoggerMiddleware) // 미들웨어 적용하기
      .apply(logger) // functional 미들웨어 적용하기
      // .forRoutes('cats') // 이렇게 작성하면 모든 request method 에 대해 적용됩니다.
      // .forRoutes({path: 'cats', method: RequestMethod.GET}) // GET 방식 요청에 한정적으로 적용됩니다.
      .forRoutes(CatsController);
  }
}
