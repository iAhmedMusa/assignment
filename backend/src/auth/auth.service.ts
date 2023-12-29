import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from '../users/dto/signIn-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.signIn(signInDto);

    const { id, email, name, phone_number, type } = user;

    const payload = {
      sub: id,
      email,
      name,
      phone_number,
      type,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
