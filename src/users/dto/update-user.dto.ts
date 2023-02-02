import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  role?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ApiProperty({
    minLength: 4,
    maxLength: 15,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(15)
  username?: string;

  @ApiProperty({
    minLength: 8,
    maxLength: 25,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(25)
  password?: string;
}
