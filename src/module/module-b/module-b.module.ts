import { forwardRef, Module } from '@nestjs/common';
import { ModuleAModule } from '../module-a/module-a.module';
import { ModuleBService } from './module-b.service';

@Module({
  imports: [forwardRef(() => ModuleAModule)],
  // imports: [ModuleAModule],
  providers: [ModuleBService],
  exports: [ModuleBService],
})
export class ModuleBModule {}
