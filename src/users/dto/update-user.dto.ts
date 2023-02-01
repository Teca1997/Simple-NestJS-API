import { IsInt, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDTO extends CreateUserDTO {
  @ApiProperty({
    required: false,
    default: 1,
    example: 1,
  })
  @IsOptional()
  @IsInt()
  role?: number;
}
