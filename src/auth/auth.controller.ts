import { Controller, Post, Body, UseInterceptors, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { SerializeInterceptor } from 'src/common/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserSerializeDto } from 'src/users/dto/user-serialize.dto';

// All routes in the AuthController are public by using the @Public() decorator.
@Public()
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(new SerializeInterceptor(UserSerializeDto))
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const user = await this.authService.login(loginDto);
    response.set('Authorization', `Bearer ${user.accessToken}`);

    const newUser = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    response.send(newUser);
  }
}
