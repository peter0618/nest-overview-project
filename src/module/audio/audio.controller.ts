import { Controller, Get } from '@nestjs/common';
import { AudioService } from './audio.service';

@Controller('audio')
export class AudioController {

  constructor(private readonly audioService: AudioService) {
  }

  @Get('')
  async addJob(){
    return await this.audioService.addJob();
  }
}
