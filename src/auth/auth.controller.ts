import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Body, Get, Param } from '@nestjs/common/decorators';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { LoginUserDTO } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtValidationPipe } from './pipes/jwt.pipe';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('/login')
  @ApiBody({ type: LoginUserDTO })
  @ApiConflictResponse()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any, @Body() loginUserDTO: LoginUserDTO) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  @ApiBody({ type: CreateUserDTO })
  @ApiConflictResponse()
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  async register(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }

  @Get('/email/verify/:token')
  @ApiOkResponse()
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  async verifyEmail(@Param('token', JwtValidationPipe) token: any) {
    console.log(token);
    return token;
  }
}
