import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const userByUsername = await this.usersService.findByUsername(
      createUserDto.username,
    );

    const userByEmail = await this.usersService.findByEmail(
      createUserDto.email,
    );

    // check if user already exists. If so, throw an error.
    if (userByUsername || userByEmail) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // create a new user
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return newUser;
  }

  async login(loginDto: LoginDto) {
    // find the user in the database
    const user = await this.usersService.findByUsername(loginDto.username);

    // if the user is not found, check if the user is the admin or throw an error.
    if (
      !user &&
      loginDto.username === 'Admin' &&
      loginDto.password === '@Admin1234'
    ) {
      // hash the password
      const hashedPassword = await bcrypt.hash(loginDto.password, 10);

      // create an Admin
      const newAdmin = {
        username: loginDto.username,
        password: hashedPassword,
        email: 'admin@email.com',
        isAdmin: true,
      };

      const admin = await this.usersService.create(newAdmin);

      if (!admin) {
        throw new HttpException('Admin not found !', HttpStatus.BAD_REQUEST);
      }

      const payload = { username: admin.username, isAdmin: admin.isAdmin };
      const token = await this.jwtService.signAsync(payload);

      return { ...admin, accessToken: token };
    }

    // if the user is not found, throw an error.
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // compare the passwords
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    // if the passwords don't match, throw an error
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { username: loginDto.username, isAdmin: false };
    const token = await this.jwtService.signAsync(payload);

    return { ...user, accessToken: token };
  }
}
