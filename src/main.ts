import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalLogger } from './middleware/global.middleware';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(globalLogger); // 이렇게 하면 모든 route 에 gloabalLogger 미들웨어가 적용됩니다.
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor()); // global 인터셉터를 적용합니다.
  await app.listen(3000);
}
bootstrap();
