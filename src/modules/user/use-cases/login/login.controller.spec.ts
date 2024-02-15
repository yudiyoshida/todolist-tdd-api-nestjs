import { Test, TestingModule } from '@nestjs/testing';

import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { LoginDto } from './dtos/login.dto';

describe('LoginController', () => {
  let controller: LoginController;
  let serviceMock: LoginService;

  const credentials: LoginDto = {
    email: 'jhondoe@email.com',
    password: '123456',
  };

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        LoginController,
      ],
      providers: [
        {
          provide: LoginService,
          useFactory: () => ({
            execute: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    serviceMock = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service only once', async() => {
    await controller.handle(credentials);

    expect(serviceMock.execute).toHaveBeenCalledTimes(1);
  });

  it('should call the service with correct arguments', async() => {
    await controller.handle(credentials);

    expect(serviceMock.execute).toHaveBeenCalledWith(credentials);
  });
});
