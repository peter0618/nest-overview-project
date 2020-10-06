import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './module/cats/cats.module';
import { LoggerModule } from './logger/logger.module';
import { MyLogger } from './logger/logger.service';
import { AudioModule } from './module/audio/audio.module';
import { ViewController } from './views/view.controller';

@Module({
  imports: [CatsModule, LoggerModule, AudioModule],
  controllers: [AppController, ViewController],
  providers: [AppService, MyLogger],
})
export class AppModule implements OnModuleInit {
  private readonly logger: MyLogger = new MyLogger(this.constructor.name);

  onModuleInit() {
    this.logger.debug(`onModuleInit()`);
  }
}
