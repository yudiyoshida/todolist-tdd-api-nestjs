import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { TOKENS } from 'src/shared/di/tokens';
import { BcryptAdapter } from 'src/shared/helpers/hashing/adapters/bcrypt';
import { GetAccountByIdService } from './get-account-by-id.service';
import { CreateAccountService } from '../create-account/create-account.service';
import { AccountInMemoryRepository } from '../../repositories/adapters/account-in-memory.repository';

describe('GetAccountByIdService', () => {
  let service: GetAccountByIdService;
  let createAccountService: CreateAccountService;

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAccountByIdService,
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

    service = module.get<GetAccountByIdService>(GetAccountByIdService);
    createAccountService = module.get<CreateAccountService>(CreateAccountService);
  });

  it('should find a specific account by its id', async() => {
    const account = await createAccountService.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456789',
    });

    const result = await service.execute(account.id);

    expect(result).toHaveProperty('id', account.id);
    expect(result).toHaveProperty('name', account.name);
    expect(result).toHaveProperty('email', account.email);
    expect(result).not.toHaveProperty('password');
  });

  it('should not find any account', async() => {
    const account = await createAccountService.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456789',
    });

    // this line is here because a fulfilled promise won't fail the test.
    expect.assertions(2);

    return service.execute(`${account.id}-RANDOM`).catch(err => {
      expect(err).toBeInstanceOf(NotFoundException);
      expect(err.response.message).toEqual('Conta não encontrada na base de dados.');
    });
  });
});
