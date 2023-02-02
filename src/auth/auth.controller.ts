import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Body, Get, Param } from '@nestjs/common/decorators';
import { ApiBody, ApiTags } from '@nestjs/swagger';
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
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any, @Body() loginUserDTO: LoginUserDTO) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  @ApiBody({ type: CreateUserDTO })
  async register(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }

  @Get('/email/verify/:token')
  async verifyEmail(@Param('token', JwtValidationPipe) token: Object) {
    console.log(token);
    return token;
  }
}
