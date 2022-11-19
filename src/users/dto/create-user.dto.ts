import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsInt,
  MaxLength,
  IsOptional,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  fullname: string;

  @IsInt()
  @IsOptional()
  age?: number | null;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  password: string;
}
