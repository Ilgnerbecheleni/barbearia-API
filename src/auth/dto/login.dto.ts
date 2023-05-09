import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 2,
    minLowercase: 0,
    minUppercase: 0,
    minSymbols: 0,
  })
  password: string;
}
