import { faker } from '@faker-js/faker';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginUserDTO } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/login')
  @ApiBody({ type: LoginUserDTO })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any, @Body() loginUserDTO: LoginUserDTO) {
    return this.authService.login(req.user);
  }

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
  @Post('/register')
  @ApiBody({ type: CreateUserDTO })
  async register(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }
}
