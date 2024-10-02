import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto)
    const user = await this.userRepository.save(newUser)
    return { id: user.id };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email: loginDto.email } })
    if (!user) {
      throw new BadRequestException('Either email or password is incorrect');
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException(`User with id ${id} not found.`);
    }
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async delete(id: number) {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new BadRequestException(`User with id ${id} not found.`);
    }

    throw new Error(`User with id ${id} not found.`);
  }
}
