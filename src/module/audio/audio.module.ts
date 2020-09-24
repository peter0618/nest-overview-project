import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioController } from './audio.controller';
import { AudioConsumer } from './audio.consumer';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [BullModule.registerQueue({
    name: 'audio',
    redis: {
      host: 'localhost',
      port: 6379,
    },
  })],
  providers: [AudioService, AudioConsumer],
  controllers: [AudioController],
})
export class AudioModule {}
