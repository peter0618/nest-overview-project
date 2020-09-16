import { Test, TestingModule } from '@nestjs/testing';
import { ModuleAService } from './module-a.service';

describe('ModuleAService', () => {
  let service: ModuleAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuleAService],
    }).compile();

    service = module.get<ModuleAService>(ModuleAService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
