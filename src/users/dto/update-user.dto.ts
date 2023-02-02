import { IsInt, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @ApiProperty({
    required: false,
    default: 1,
    example: 1,
  })
  @IsOptional()
  @IsInt()
  role?: number;
}
