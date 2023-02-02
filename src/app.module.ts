import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { Role } from './roles/entities/role.entity';
import { RolesModule } from './roles/roles.module';
import { Token } from './tokens/entities/token.entity';
import { TokensModule } from './tokens/tokens.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { databaseConfig } from './database/config';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    TokensModule,
    AuthModule,
    TypeOrmModule.forRoot(databaseConfig.options),
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Token]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
