import { Controller, Get, HttpStatus, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
import { RolesService } from './roles.service';

@ApiTags('roles')
@ApiBearerAuth('access-token')
@Controller('roles')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(RoleEnum.Admin)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get()
  @ApiOkResponse()
  @ApiInternalServerErrorResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiInternalServerErrorResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  findOne(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
  ) {
    return this.rolesService.findOne(id);
  }
}
