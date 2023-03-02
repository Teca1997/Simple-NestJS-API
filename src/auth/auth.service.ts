import * as bcrypt from 'bcrypt';

import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, refreshToken, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    if (user.verifiedDate == null) {
      throw new UnauthorizedException('User did not confirm their email.');
    }

    const tokens = await this.getTokens(user);

    await this.updateRefreshToken(user.id!, tokens.refreshToken);
    return { tokens, user };
  }

  async logout(userId: number) {
    const res = await this.usersService.update(userId, { refreshToken: null });

    return res;
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    //const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.update(userId, {
      refreshToken: refreshToken,
    });
  }

  async getTokens(sub: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub,
        },
        {
          secret: process.env.JWT_SECRET || 'secret_key',
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub,
        },
        {
          secret: process.env.JWT_SECRET || 'secret_key',
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: number) {
    const user = await this.usersService.findOneById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    const { password, refreshToken, ...sub } = user;
    const tokens = await this.getTokens(sub);
    await this.updateRefreshToken(user.id!, tokens.refreshToken);
    return tokens;
  }
}
