import { IsInt, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}

export class UpdateCatDto {
  name: string;
  age: number;
  breed: string;
}
