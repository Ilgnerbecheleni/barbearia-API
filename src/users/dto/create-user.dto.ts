import {
  IsBoolean,
  IsEmail,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
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
  @IsBoolean()
  isActive: boolean;
}
