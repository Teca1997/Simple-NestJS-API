import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { Role } from './roles/entities/role.entity';
import { RolesModule } from './roles/roles.module';
import { Token } from './tokens/entities/token.entity';
import { TokensModule } from './tokens/tokens.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    TokensModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      database: process.env.DB_DATABASE || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      schema: process.env.DB_SCHEMA || 'public',
      migrationsRun: false,
      synchronize: false,
      dropSchema: false,
      entities: [User, Role, Token],
      subscribers: [],
      logger: 'advanced-console',
      poolSize: 15,
      logging: false /* process.env.DB_LOGGING === "true" */,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
