import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async create(userDto: CreateUserDto) {
    const saltOrRounds = 10;
    const password = userDto.password;
    userDto.password = await bcrypt.hash(password, saltOrRounds);

    const newUser = this.userRepository.create(userDto)
    const user = await this.userRepository.save(newUser)
    return { id: user.id };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email: loginDto.email } })
    if (!user) {
      throw new BadRequestException('Either email or password is incorrect');
    }

    if (!await bcrypt.compare(loginDto.password, user.password)) {
      throw new BadRequestException('Either email or password is incorrect');
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email })

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token
    }
  }

  async findAll() {
    const users = await this.userRepository.find();

    for (let index = 0; index < users.length; index++) {
      delete users[index].password;
    }

    return users
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException(`User with id ${id} not found.`);
    }

    delete user.password

    return user
  }

  update(id: string, userDto: UpdateUserDto) {
    return this.userRepository.update(id, userDto);
  }

  async delete(id: string) {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new BadRequestException(`User with id ${id} not found.`);
    }

    await this.userRepository.delete({ id })
    return { id }
  }
}
