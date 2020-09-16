import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ModuleBService } from '../module-b/module-b.service';

@Injectable()
export class ModuleAService {
  constructor(
    @Inject(forwardRef(() => ModuleBService))
    private readonly moduleBService: ModuleBService) {
  }
}
