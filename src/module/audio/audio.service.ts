import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { MyLogger } from '../../logger/logger.service';

@Injectable()
export class AudioService {
  private readonly logger: MyLogger = new MyLogger(this.constructor.name);

  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  async addJob() {
    this.logger.debug(`addJob()`);
    const job = await this.audioQueue.add('transcode', {
      foo: 'bar',
    });
    return job.id;
  }
}
