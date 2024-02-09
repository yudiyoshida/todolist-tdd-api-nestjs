import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { TOKENS } from '@shared/di/tokens';
import { IHashingHelper } from '@shared/helpers/hashing/hashing.interface';
import { CreateAccountDto } from './dtos/create-account.dto';
import { IUserRepository } from '../../repositories/user-repository.interface';

@Injectable()
export class CreateAccountService {
  constructor(
    @Inject(TOKENS.IUserRepository) private userRepository: IUserRepository,
    @Inject(TOKENS.IHashingHelper) private hashingHelper: IHashingHelper
  ) {}

  public async execute(data: CreateAccountDto) {
    const isEmailNotUnique = await this.userRepository.findByEmail(data.email);
    if (isEmailNotUnique) {
      throw new ConflictException('Email já está sendo utilizado.');
    }

    // hash password.
    data.password = this.hashingHelper.hash(data.password);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...account } = await this.userRepository.save(data);

    return account;
  }
}
