import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountService } from './create-account.service';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UserInMemoryRepository } from '../../repositories/adapters/user-in-memory.repository';
import { TOKENS } from '@shared/di/tokens';
import { ConflictException } from '@nestjs/common';

describe('CreateAccountService', () => {
  let service: CreateAccountService;

  const data: CreateAccountDto = {
    name: 'Jhon Doe',
    email: 'jhondoe@mail.com',
    password: '123456789',
  };

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAccountService,
        {
          provide: TOKENS.IUserRepository,
          useClass: UserInMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<CreateAccountService>(CreateAccountService);
  });

  it('create a new account', async() => {
    const result = await service.execute(data);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name', data.name);
    expect(result).toHaveProperty('email', data.email);
    expect(result).not.toHaveProperty('password');
  });

  it('return an error when providing an email that is being used', async() => {
    // this line is here because a fulfilled promise won't fail the test.
    expect.assertions(2);

    // first register.
    await service.execute(data);

    // second register.
    return service.execute(data).catch(err => {
      expect(err).toBeInstanceOf(ConflictException);
      expect(err.response.message).toEqual('Email is already taken.');
    });
  });
});
