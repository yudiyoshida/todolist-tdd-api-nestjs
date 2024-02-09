import { Test, TestingModule } from '@nestjs/testing';

import { CreateAccountController } from './create-account.controller';
import { CreateAccountService } from './create-account.service';
import { CreateAccountDto } from './dtos/create-account.dto';

describe('CreateAccountController', () => {
  let controller: CreateAccountController;

  const data: CreateAccountDto = {
    name: 'Jhon Doe',
    email: 'jhondoe@mail.com',
    password: '123456789',
  };

  const mockCreateAccountService = {
    execute: jest.fn().mockResolvedValue({ ...data }),
  };

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateAccountController],
      providers: [CreateAccountService],
    })
      .overrideProvider(CreateAccountService)
      .useValue(mockCreateAccountService)
      .compile();

    controller = module.get<CreateAccountController>(CreateAccountController);
  });

  it('should return the exact result from service', async() => {
    const result = await controller.handle(data);

    expect(result).toStrictEqual(data);
  });
});
