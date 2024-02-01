import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const testUser: CreateUserDto = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: '@password123',
        isAdmin: false,
      };

      jest
        .spyOn(authService, 'register')
        .mockResolvedValueOnce({ id: 1, ...testUser, tasks: [] });

      const result = await controller.register(testUser);

      expect(result).toEqual({ id: 1, ...testUser });
    });
  });

  describe('login', () => {
    it('should login and return user information with access token', async () => {
      const testUser: LoginDto = {
        username: 'testuser',
        password: '@password123',
      };

      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'testuser@example.com',
        password: '@password123',
        isAdmin: false,
        tasks: [],
        accessToken: 'mockAccessToken',
      };

      jest.spyOn(authService, 'login').mockResolvedValueOnce(mockUser);

      const responseMock = {
        set: jest.fn(),
        send: jest.fn(),
      };

      // @ts-ignore
      await controller.login(testUser, responseMock);

      expect(responseMock.set).toHaveBeenCalledWith(
        'Authorization',
        'Bearer mockAccessToken',
      );
      expect(responseMock.send).toHaveBeenCalledWith({
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
      });
    });
  });
});
