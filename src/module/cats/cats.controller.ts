import {
  Body,
  Controller,
  Delete, ForbiddenException,
  Get, HttpException, HttpStatus,
  Param,
  Post,
  Put, UseFilters,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from '../../filter/http-exception.filter';

@Controller('cats')
// @UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    // this.catsService.create(createCatDto);
    throw new ForbiddenException();
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, HttpStatus.FORBIDDEN);
    // return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `this action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `this action updates #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `this action removes #${id} cat`;
  }
}
