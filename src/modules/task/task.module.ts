import { Module } from '@nestjs/common';

import { AccountModule } from '../account/account.module';

import { TOKENS } from 'src/shared/di/tokens';
import { PaginationService } from 'src/shared/helpers/pagination/pagination.service';
import { TaskInMemoryRepository } from './repositories/adapters/task-in-memory.repository';

import { CreateTaskController } from './use-cases/create-task/create-task.controller';
import { CreateTaskService } from './use-cases/create-task/create-task.service';

import { GetAllTasksController } from './use-cases/get-all-tasks/get-all-tasks.controller';
import { GetAllTasksService } from './use-cases/get-all-tasks/get-all-tasks.service';

import { GetTaskByIdController } from './use-cases/get-task-by-id/get-task-by-id.controller';
import { GetTaskByIdService } from './use-cases/get-task-by-id/get-task-by-id.service';

import { DeleteTaskController } from './use-cases/delete-task/delete-task.controller';
import { DeleteTaskService } from './use-cases/delete-task/delete-task.service';

@Module({
  imports: [
    AccountModule,
  ],
  controllers: [
    CreateTaskController,
    GetAllTasksController,
    GetTaskByIdController,
    DeleteTaskController,
  ],
  providers: [
    CreateTaskService,
    GetAllTasksService,
    GetTaskByIdService,
    DeleteTaskService,
    {
      provide: TOKENS.ITaskRepository,
      useClass: TaskInMemoryRepository,
    },
    PaginationService,
  ],
})
export class TaskModule {}
