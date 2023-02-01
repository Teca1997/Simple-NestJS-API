import { IsInt, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({
    required: false,
    default: 1,
    example: 1,
  })
  @IsOptional()
  @IsInt()
  role?: number;
}
