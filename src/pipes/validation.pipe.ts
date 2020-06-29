import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    // 여기서 value 는 클라이언트로부터 전송받은 plain javascript object 입니다.
    // plainToClass 메소드는 plain javascript 를 class object 형태로 변환시켜 줍니다.
    const object = plainToClass(metatype, value);

    const errors = await validate(object);
    if (errors.length > 0) {
      // console.log(errors);
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
