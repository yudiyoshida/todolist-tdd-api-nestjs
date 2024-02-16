import { Module } from '@nestjs/common';

import { AccountModule } from '../account/account.module';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';

import { LoginController } from './use-cases/login/login.controller';
import { LoginService } from './use-cases/login/login.service';

@Module({
  imports: [
    AccountModule,
  ],
  controllers: [
    LoginController,
  ],
  providers: [
    LoginService,
    AuthenticationGuard,
  ],
})
export class AuthModule {}
