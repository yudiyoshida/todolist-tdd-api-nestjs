import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

import { Account } from '../../entities/account.entity';
import { CreateAccountDto } from '../../use-cases/create-account/dtos/create-account.dto';
import { IAccountRepository } from '../account-repository.interface';

@Injectable()
export class AccountInMemoryRepository implements IAccountRepository {
  private readonly _accounts: Account[] = [];

  public async findById(id: string): Promise<Omit<Account, 'password'>> {
    const account = this._accounts.find(account => account.id === id);

    if (account) {
      delete account.password;
    }

    return account;
  }

  public async findByEmail(email: string): Promise<Account | null> {
    return this._accounts.find(account => account.email === email);
  }

  public async save(data: CreateAccountDto): Promise<Omit<Account, 'password' | 'permissions'>> {
    const newAccount = { id: crypto.randomUUID(), permissions: [], ...data };

    this._accounts.push(newAccount);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, permissions, ...body } = newAccount;

    return body;
  }
}
