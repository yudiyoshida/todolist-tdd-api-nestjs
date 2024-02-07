import { Module } from '@nestjs/common';

import { CreateAccountController } from './use-cases/create-account/create-account.controller';

import { CreateAccountService } from './use-cases/create-account/create-account.service';
import { UserInMemoryRepository } from './repositories/adapters/user-in-memory.repository';
import { TOKENS } from '@shared/di/tokens';

@Module({
  controllers: [
    CreateAccountController,
  ],
  providers: [
    CreateAccountService,
    UserInMemoryRepository,
    {
      provide: TOKENS.IUserRepository,
      useExisting: UserInMemoryRepository,
    },
  ],
})
export class UserModule {}
