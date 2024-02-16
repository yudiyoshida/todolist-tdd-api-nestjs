import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { AccountModule } from '../../account.module';
import { GetAccountByIdService } from './get-account-by-id.service';
import { CreateAccountService } from '../create-account/create-account.service';

describe('GetAccountByIdService', () => {
  let service: GetAccountByIdService;
  let createAccountService: CreateAccountService;

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountModule],
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
