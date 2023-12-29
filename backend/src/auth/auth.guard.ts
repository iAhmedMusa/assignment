import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { Equal } from 'typeorm';

config();

const configService = new ConfigService();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException('Login please');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: configService.get<string>('JWT_SECRET'),
      });

      const userInfo = await this.usersService.findOne({
        where: {
          id: Equal(payload.sub),
          email: Equal(payload.email),
          type: Equal(payload.type),
        },
      });

      if (!userInfo) {
        throw new UnauthorizedException('Conflicting credential');
      }

      req['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
