import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalLogger } from './middleware/global.middleware';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(globalLogger); // 이렇게 하면 모든 route 에 gloabalLogger 미들웨어가 적용됩니다.
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
