import { Injectable } from '@nestjs/common';

import { Task } from '../../entities/task.entity';
import { CreateTaskDto } from '../../use-cases/create-task/dtos/create-task.dto';
import { ITaskRepository } from '../task-repository.interface';

@Injectable()
export class TaskInMemoryRepository implements ITaskRepository {
  public readonly _tasks: Task[] = [];

  public async save(data: CreateTaskDto, accountId: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description ?? null,
      isDone: false,
      accountId,
    };

    this._tasks.push(newTask);

    return newTask;
  }
}
