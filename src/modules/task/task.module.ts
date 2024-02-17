import { Module } from '@nestjs/common';

import { AccountModule } from '../account/account.module';

import { TOKENS } from 'src/shared/di/tokens';
import { TaskInMemoryRepository } from './repositories/adapters/task-in-memory.repository';

import { CreateTaskController } from './use-cases/create-task/create-task.controller';
import { CreateTaskService } from './use-cases/create-task/create-task.service';

@Module({
  imports: [
    AccountModule,
  ],
  controllers: [
    CreateTaskController,
  ],
  providers: [
    CreateTaskService,
    {
      provide: TOKENS.ITaskRepository,
      useClass: TaskInMemoryRepository,
    },
  ],
})
export class TaskModule {}
