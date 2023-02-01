import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDTO } from './login-user.dto';
import { faker } from '@faker-js/faker';

export class CreateUserDTO extends LoginUserDTO {
  @ApiProperty({ required: true, example: faker.internet.email() })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
