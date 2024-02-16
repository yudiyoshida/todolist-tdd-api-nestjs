import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AccountModule } from './modules/account/account.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AccountModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
