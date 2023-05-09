import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, email } = createUserDto;
    const emailExists = await this.emailExists(email);
    if (emailExists) {
      throw new BadRequestException('Email already in use');
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return this.userRepository.save({ ...createUserDto, password: hash });
  }

  async findByemail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    return user;
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
