import { Module } from '@nestjs/common';

import { TOKENS } from '@shared/di/tokens';
import { BcryptAdapter } from '@shared/helpers/hashing/adapters/bcrypt';
import { UserInMemoryRepository } from './repositories/adapters/user-in-memory.repository';

import { CreateAccountController } from './use-cases/create-account/create-account.controller';
import { CreateAccountService } from './use-cases/create-account/create-account.service';

import { LoginController } from './use-cases/login/login.controller';
import { LoginService } from './use-cases/login/login.service';

@Module({
  controllers: [
    CreateAccountController,
    LoginController,
  ],
  providers: [
    CreateAccountService,
    LoginService,
    {
      provide: TOKENS.IUserRepository,
      useClass: UserInMemoryRepository,
    },
    {
      provide: TOKENS.IHashingHelper,
      useClass: BcryptAdapter,
    },
  ],
})
export class UserModule {}
