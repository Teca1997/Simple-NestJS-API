import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { RoleEnum } from '../enums/roles.enum';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(RoleEnum.Admin)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @ApiBody({ type: CreateUserDTO })
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
  @ApiInternalServerErrorResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  async findOne(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
  ) {
    const user = await this.usersService.findOneById(id);
    if (user === undefined) {
      throw new NotFoundException(`User with ID ${id} was not found`);
    }
    return user;
  }

  @Patch(':id')
  @ApiOkResponse()
  @ApiInternalServerErrorResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiNotAcceptableResponse()
  async update(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return await this.usersService.update(id, updateUserDTO);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiInternalServerErrorResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  async remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return await this.usersService.remove(id);
  }
}
