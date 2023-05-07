import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.findByemail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const saltOrRounds = 10;
    const passwordHashed = await bcrypt.hash(password, saltOrRounds);
    const isPasswordValid = await bcrypt.compare(user.password, passwordHashed);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = {
      username: user.username,
      sub: user.id,
      activate: user.isActive,
    };
    const token = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return { token: token };
  }
}
