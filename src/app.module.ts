import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './module/cats/cats.module';
import { LoggerModule } from './logger/logger.module';
import { MyLogger } from './logger/logger.service';
import { AudioModule } from './module/audio/audio.module';
import { ViewController } from './views/view.controller';
import { ModuleAModule } from './module/module-a/module-a.module';
import { ModuleBModule } from './module/module-b/module-b.module';
import { ExcelModule } from './module/excel/excel.module';

@Module({
  imports: [CatsModule, LoggerModule, AudioModule, ModuleAModule, ModuleBModule, ExcelModule],
  controllers: [AppController, ViewController],
  providers: [AppService, MyLogger],
})
export class AppModule implements OnModuleInit {
  private readonly logger: MyLogger = new MyLogger(this.constructor.name);

  onModuleInit() {
    this.logger.debug(`onModuleInit()`);
  }
}
