import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userAuth: AuthService) {}
  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    return this.userAuth.login(email, password);
  }

  @Post('register')
  async register(@Body() body: RegisterDTO) {
    return this.userAuth.register(body);
  }

  @Post('forget')
  async forget(@Body() body: RegisterDTO) {}

  @Post('me')
  async me(@Body() body) {
    const { token } = body;

    return this.userAuth.checkToken(token);
  }
}
