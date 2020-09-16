import { forwardRef, Module } from '@nestjs/common';
import { ModuleBModule } from '../module-b/module-b.module';
import { ModuleAService } from './module-a.service';

@Module({
  imports: [forwardRef(() => ModuleBModule)],
  // imports: [ModuleBModule],
  providers: [ModuleAService],
  exports: [ModuleAService],
})
export class ModuleAModule {}
