import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDTO {
  @ApiProperty({
    minLength: 4,
    maxLength: 15,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(15)
  username: string;

  @ApiProperty({
    minLength: 8,
    maxLength: 25,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(25)
  password: string;
}
