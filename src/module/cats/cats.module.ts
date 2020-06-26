import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], // 이렇게 하면 다른 모듈에서 CatsModule 을 import 했을 때, CatsService 를 공유해서 사용할 수 있습니다.
})
export class CatsModule {}
