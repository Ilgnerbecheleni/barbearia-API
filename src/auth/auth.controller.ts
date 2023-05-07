import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userAuth: AuthService) {}
  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    return this.userAuth.signIn(email, password);
  }
}
