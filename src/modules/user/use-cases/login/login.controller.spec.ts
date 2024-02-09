import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { LoginDto } from './dtos/login.dto';

describe('LoginController', () => {
  let controller: LoginController;

  const credentials: LoginDto = {
    email: 'jhondoe@email.com',
    password: '123456',
  };

  const mockLoginService = {
    execute: jest.fn().mockResolvedValue({ accessToken: 'jwt' }),
  };

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService],
    })
      .overrideProvider(LoginService)
      .useValue(mockLoginService)
      .compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should return an access token', async() => {
    await expect(controller.handle(credentials))
      .resolves
      .toHaveProperty('accessToken', 'jwt');
  });
});
