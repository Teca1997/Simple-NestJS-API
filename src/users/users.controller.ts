import { faker } from '@faker-js/faker';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/enums/roles.enum';
import { Roles } from 'src/roles/roles.decorator';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@Roles(Role.Admin)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @ApiBody({
    type: CreateUserDTO,
    examples: {
      CREATED: {
        description: 'Creates a new user',
        value: {
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: 'password',
        },
      },
      BAD_REQUEST_1: {
        description:
          'Returns bad request as username was not passed or is of wrong format.',
        value: {
          email: faker.internet.email(),
          password: 'password',
        },
      },
      BAD_REQUEST_2: {
        description:
          'Returns bad request as email was not passed or is of wrong format.',
        value: {
          username: faker.internet.userName(),
          password: 'password',
        },
      },
      BAD_REQUEST_3: {
        description:
          'Returns bad request as password was not passed or is of wrong format.',
        value: {
          username: faker.internet.userName(),
          email: faker.internet.email(),
        },
      },
      CONFLICT_1: {
        description: 'Returns conflict as username is already used',
        value: {
          username: 'admin',
          email: 'admin@admin.com',
          password: 'password',
        },
      },
      CONFLICT_2: {
        description: 'Returns conflict as email already used',
        value: {
          username: 'admin',
          email: 'admin@admin.com',
          password: 'password',
        },
      },
    },
  })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiConflictResponse()
  async create(@Body() createUserDto: CreateUserDTO) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    const user = this.usersService.findOneById(id);
    if (user === undefined) {
      throw new NotFoundException(`User with ID ${id} was not found`);
    }
    return user;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return await this.usersService.update(id, updateUserDTO);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return await this.usersService.remove(id);
  }
}
