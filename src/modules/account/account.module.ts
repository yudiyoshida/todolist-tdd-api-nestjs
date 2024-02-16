import { Module, Provider } from '@nestjs/common';

import { TOKENS } from 'src/shared/di/tokens';
import { AccountInMemoryRepository } from './repositories/adapters/account-in-memory.repository';
import { BcryptAdapter } from 'src/shared/helpers/hashing/adapters/bcrypt';

import { CreateAccountController } from './use-cases/create-account/create-account.controller';
import { CreateAccountService } from './use-cases/create-account/create-account.service';

const providers: Provider[] = [
  CreateAccountService,
  {
    provide: TOKENS.IAccountRepository,
    useClass: AccountInMemoryRepository,
  },
  {
    provide: TOKENS.IHashingHelper,
    useClass: BcryptAdapter,
  },
];

@Module({
  controllers: [
    CreateAccountController,
  ],
  providers: [...providers],
  exports: [...providers],
})
export class AccountModule {}
