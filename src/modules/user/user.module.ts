import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TOKENS } from 'src/shared/di/tokens';
import { BcryptAdapter } from 'src/shared/helpers/hashing/adapters/bcrypt';
import { UserInMemoryRepository } from './repositories/adapters/user-in-memory.repository';

import { CreateAccountController } from './use-cases/create-account/create-account.controller';
import { CreateAccountService } from './use-cases/create-account/create-account.service';

import { LoginController } from './use-cases/login/login.controller';
import { LoginService } from './use-cases/login/login.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
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
