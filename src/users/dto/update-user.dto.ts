import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  email: string;
  @IsString()
  username: string;
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 2,
  })
  password: string;
  @IsString()
  isActive: boolean;
}
