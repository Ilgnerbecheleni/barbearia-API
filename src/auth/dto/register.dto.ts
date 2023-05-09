import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  email: string;
  @IsString()
  username: string;
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 2,
    minLowercase: 0,
    minUppercase: 0,
    minSymbols: 0,
  })
  password: string;

  isActive: boolean;
}
