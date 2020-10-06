import { Controller, Get, Render } from '@nestjs/common';

@Controller('view')
export class ViewController {
  @Get()
  @Render('view.ejs')
  async view() {
    return { name: 'peter', age: 28, job: 'software engineer'};
  }
}
