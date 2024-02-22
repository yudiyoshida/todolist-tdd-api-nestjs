import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppRouterModule } from './app-router.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthModule } from './modules/auth/jwt.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    AppRouterModule,
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    PrismaModule,
    AccountModule,
    AuthModule,
    JwtAuthModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
