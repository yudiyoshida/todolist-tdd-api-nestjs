import { Module } from '@nestjs/common';

import { AccountModule } from '../account/account.module';

import { TOKENS } from 'src/shared/di/tokens';
import { PaginationService } from 'src/shared/helpers/pagination/pagination.service';
import { TaskInMemoryRepository } from './repositories/adapters/task-in-memory.repository';

import { CreateTaskController } from './use-cases/create-task/create-task.controller';
import { CreateTaskService } from './use-cases/create-task/create-task.service';

import { GetAllTasksWithPaginationController } from './use-cases/get-all-tasks-with-pagination/get-all-tasks-with-pagination.controller';
import { GetAllTasksWithPaginationService } from './use-cases/get-all-tasks-with-pagination/get-all-tasks-with-pagination.service';

import { GetTaskByIdController } from './use-cases/get-task-by-id/get-task-by-id.controller';
import { GetTaskByIdService } from './use-cases/get-task-by-id/get-task-by-id.service';

@Module({
  imports: [
    AccountModule,
  ],
  controllers: [
    CreateTaskController,
    GetAllTasksWithPaginationController,
    GetTaskByIdController,
  ],
  providers: [
    CreateTaskService,
    GetAllTasksWithPaginationService,
    GetTaskByIdService,
    {
      provide: TOKENS.ITaskRepository,
      useClass: TaskInMemoryRepository,
    },
    PaginationService,
  ],
})
export class TaskModule {}
