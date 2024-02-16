import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthModule } from './modules/auth/jwt.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    AccountModule,
    AuthModule,
    JwtAuthModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
