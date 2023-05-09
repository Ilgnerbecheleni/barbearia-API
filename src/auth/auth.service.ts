import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateToken(user: User) {
    return {
      token: this.jwtService.sign(
        {
          indexOf: user.id,
          username: user.username,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: 'login',
          audience: 'users',
          secret: process.env.JWT_SECRET,
        },
      ),
    };
  }

  async checkToken(token: string) {
    try {
      console.log(token);
      const data = await this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'login',
        secret: process.env.JWT_SECRET,
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByemail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email ');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    /// gerar token
    const token = await this.generateToken(user);
    return token;
  }

  async register(user: RegisterDTO) {
    const userRegister = await this.userService.create(user);
    const token = await this.generateToken(userRegister);
    return { token };
  }
}
