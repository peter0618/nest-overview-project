import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalLogger } from './middleware/global.middleware';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { MyLogger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false, // 로깅 끄기
    // logger: ['error', 'warn', 'log'], // 로그레벨 명시하기 ('log', 'error', 'warn', 'debug', 'verbose')
    // logger: console,
    logger: new MyLogger('TEST_APP'),
  });
  // app.use(globalLogger); // 이렇게 하면 모든 route 에 gloabalLogger 미들웨어가 적용됩니다.
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor()); // global 인터셉터를 적용합니다.
  await app.listen(3000);
}
bootstrap();
