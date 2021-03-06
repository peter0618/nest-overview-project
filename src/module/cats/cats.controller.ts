import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from '../../filter/http-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { Roles } from '../../auth/roles.decorator';
import { AuthGuard } from '../../auth/auth.guard';
import { LoggingInterceptor } from '../../interceptor/logging.interceptor';
import { MyLogger } from '../../logger/logger.service';

@Controller('cats')
// @UseFilters(HttpExceptionFilter)
// @UseGuards(AuthGuard)
// @UseInterceptors(LoggingInterceptor)
export class CatsController {
  private readonly logger: MyLogger = new MyLogger(this.constructor.name);
  constructor(private readonly catsService: CatsService) {}

  @Post()
  // @SetMetadata('roles', ['admin'])
  @Roles('admin', 'user')
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    // throw new ForbiddenException();
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // throw new HttpException({
    //   status: HttpStatus.FORBIDDEN,
    //   error: 'This is a custom message',
    // }, HttpStatus.FORBIDDEN);
    try {
      throw new Error('AnError');
    } catch (e) {
      // this.logger.error('에러 발생!!');
      // this.logger.error(e.toString());
      // this.logger.error(e.message);
      // this.logger.error(e.stack);
      this.logger.error(e);
    }

    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
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
