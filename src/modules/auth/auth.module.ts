import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { LoginController } from './use-cases/login/login.controller';
import { LoginService } from './use-cases/login/login.service';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
    AccountModule,
  ],
  controllers: [
    LoginController,
  ],
  providers: [
    LoginService,
  ],
})
export class AuthModule {}
