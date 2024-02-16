import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

import { Account } from '../../entities/account.entity';
import { CreateAccountDto } from '../../use-cases/create-account/dtos/create-account.dto';
import { IAccountRepository } from '../account-repository.interface';

@Injectable()
export class AccountInMemoryRepository implements IAccountRepository {
  private readonly _accounts: Account[] = [];

  public async findByEmail(email: string): Promise<Account | null> {
    return this._accounts.find(account => account.email === email);
  }

  public async save(data: CreateAccountDto): Promise<Account> {
    const newAccount = { id: crypto.randomUUID(), ...data };

    this._accounts.push(newAccount);

    return newAccount;
  }
}
