import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';

import { TOKENS } from 'src/shared/di/tokens';
import { BcryptAdapter } from 'src/shared/helpers/hashing/adapters/bcrypt';
import { CreateAccountService } from './create-account.service';
import { CreateAccountDto } from './dtos/create-account.dto';
import { AccountInMemoryRepository } from '../../repositories/adapters/account-in-memory.repository';

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
          provide: TOKENS.IAccountRepository,
          useClass: AccountInMemoryRepository,
        },
        {
          provide: TOKENS.IHashingHelper,
          useClass: BcryptAdapter,
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
      expect(err.response.message).toEqual('Email já está sendo utilizado.');
    });
  });
});
