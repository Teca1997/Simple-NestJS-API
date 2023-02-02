import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtStrategy,
  ],
  exports: [UsersService],
})
export class UsersModule {}
