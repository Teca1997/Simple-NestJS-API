import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class CreateUserDto {
  @ApiProperty({
    minLength: 4,
    maxLength: 15,
    required: true,
    example: faker.internet.userName().slice(0, 10),
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(15)
  username: string;

  @ApiProperty({ required: true, example: faker.internet.email() })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    minLength: 8,
    maxLength: 25,
    required: true,
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(25)
  password: string;
}
