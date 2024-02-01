import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  // Add the dependency injection for the User entity
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // Add create method
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({ ...createUserDto, tasks: [] });

    return await this.userRepository.save(user);
  }

  // Add find by username method
  async findByUsername(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  // Add find by email method
  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
