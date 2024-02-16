import { Module } from '@nestjs/common';

import { TOKENS } from 'src/shared/di/tokens';
import { AccountInMemoryRepository } from './repositories/adapters/account-in-memory.repository';
import { BcryptAdapter } from 'src/shared/helpers/hashing/adapters/bcrypt';

import { CreateAccountController } from './use-cases/create-account/create-account.controller';
import { CreateAccountService } from './use-cases/create-account/create-account.service';

@Module({
  controllers: [
    CreateAccountController,
  ],
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
})
export class AccountModule {}
