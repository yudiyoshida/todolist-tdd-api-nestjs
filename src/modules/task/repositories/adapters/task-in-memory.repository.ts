import { Injectable } from '@nestjs/common';

import { ITaskDto } from '../../entities/task.entity';
import { CreateTaskDto } from '../../use-cases/create-task/dtos/create-task.dto';
import { ITaskRepository } from '../task-repository.interface';

@Injectable()
export class TaskInMemoryRepository implements ITaskRepository {
  public readonly _tasks: ITaskDto[] = [];

  public async findAllWithPagination(page: number, size: number) {
    const take = size;
    const skip = ((page - 1) * size);

    const tasks = this._tasks.slice(skip, skip + take);

    return [tasks, this._tasks.length] as [ITaskDto[], number];
  }

  public async findById(id: string, userId: string) {
    return this._tasks.find(item => item.id === id && item.accountId === userId);
  }

  public async save(data: CreateTaskDto, accountId: string) {
    const newTask: ITaskDto = {
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
