import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { TOKENS } from 'src/shared/di/tokens';
import { IHashingHelper } from 'src/shared/helpers/hashing/hashing.interface';
import { CreateAccountDto } from './dtos/create-account.dto';
import { IAccountRepository } from '../../repositories/account-repository.interface';

@Injectable()
export class CreateAccountService {
  constructor(
    @Inject(TOKENS.IAccountRepository) private accountRepository: IAccountRepository,
    @Inject(TOKENS.IHashingHelper) private hashingHelper: IHashingHelper
  ) {}

  public async execute(data: CreateAccountDto) {
    const emailIsNotUnique = await this.accountRepository.findByEmail(data.email);
    if (emailIsNotUnique) {
      throw new ConflictException('Email já está sendo utilizado.');
    }

    // hash password.
    data.password = this.hashingHelper.hash(data.password);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...account } = await this.accountRepository.save(data);

    return account;
  }
}
