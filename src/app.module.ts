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
import { UserSubscriber } from './database/subscribers/user.subscriber';
import { UsersModule } from './users/users.module';
import { seed1673393951184 } from './database/migrations/1673393951184-seed';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    TokensModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST?.trim() || '127.0.0.1',
      port: Number(process.env.DB_PORT?.trim()) || 5432,
      username: process.env.DB_USERNAME?.trim() || 'postgres',
      database: process.env.DB_DATABASE?.trim() || 'postgres',
      password: process.env.DB_PASSWORD?.trim() || 'postgres',
      //schema: process.env.DB_SCHEMA || 'public',
      //dropSchema: process.env.NODE_ENV?.trim() == 'development' ? true : false,
      synchronize: process.env.NODE_ENV?.trim() == 'development' ? true : false,
      migrationsRun:
        process.env.NODE_ENV?.trim() === 'development' ? true : false,
      entities: [User, Role, Token],
      subscribers: [UserSubscriber],
      migrations: [seed1673393951184],
      logger: 'advanced-console',
      poolSize: 15,
      logging: process.env.NODE_ENV?.trim() === 'development' ? true : false,
    }),
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Token]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
