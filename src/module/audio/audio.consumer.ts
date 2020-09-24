import { Process, Processor } from '@nestjs/bull';
import { MyLogger } from '../../logger/logger.service';
import { Job } from 'bull';

@Processor('audio')
export class AudioConsumer {
  private readonly logger: MyLogger = new MyLogger(this.constructor.name);

  @Process('transcode')
  handleTranscode(job: Job) {
    this.logger.debug('Start transcoding...');
    this.logger.debug(job.data);
    this.logger.debug('Transcoding completed');
  }
}
