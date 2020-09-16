import { Test, TestingModule } from '@nestjs/testing';
import { ModuleBService } from './module-b.service';

describe('ModuleBService', () => {
  let service: ModuleBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuleBService],
    }).compile();

    service = module.get<ModuleBService>(ModuleBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
