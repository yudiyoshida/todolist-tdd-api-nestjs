import { Module } from '@nestjs/common';

import { RouterModule } from '@nestjs/core';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'accounts',
        module: AccountModule,
      },
      {
        path: 'login',
        module: AuthModule,
      },
      {
        path: 'tasks',
        module: TaskModule,
      },
    ]),
  ],
})
export class AppRouterModule {}
