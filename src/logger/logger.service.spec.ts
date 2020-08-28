import { MyLogger } from './logger.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('LoggerService', () => {
  let logger: MyLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyLogger],
    }).compile();

    logger = module.get<MyLogger>(MyLogger);
    logger.setContext('TestingModule');
  });

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('logging color check', () => {
    logger.log('log');
    logger.verbose('verbose');
    logger.debug('debug');
    logger.warn('warn');
    logger.error('error');
  });
});
