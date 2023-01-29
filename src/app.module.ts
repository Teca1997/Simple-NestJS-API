import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { TokensModule } from './tokens/tokens.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, RolesModule, TokensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
