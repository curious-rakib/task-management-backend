import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor() {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findByUsername(username: string) {
    return `This action returns all users`;
  }

  updateByUsername(username: string, updateUserDto: UpdateUserDto) {
    return `This action updates a user`;
  }

  removeByUsername(username: string) {
    return `This action removes a user`;
  }
}
