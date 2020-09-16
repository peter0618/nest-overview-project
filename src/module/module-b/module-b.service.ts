import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ModuleAService } from '../module-a/module-a.service';

@Injectable()
export class ModuleBService {
  constructor(
    @Inject(forwardRef(() => ModuleAService))
    private readonly moduleAService: ModuleAService) {
  }
}
