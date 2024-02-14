import { Module } from '@nestjs/common';

import { TOKENS } from 'src/shared/di/tokens';
import { CreateTaskController } from './use-cases/create-task/create-task.controller';
import { CreateTaskService } from './use-cases/create-task/create-task.service';
import { TaskInMemoryRepository } from './repositories/adapters/task-in-memory.repository';

@Module({
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
