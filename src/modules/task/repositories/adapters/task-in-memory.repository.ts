import { Injectable } from '@nestjs/common';

import { ITaskRepository } from '../task-repository.interface';
import { Task } from '../../entities/task.entity';
import { CreateTaskDto } from '../../use-cases/create-task/dtos/create-task.dto';

@Injectable()
export class TaskInMemoryRepository implements ITaskRepository {
  private tasks: Task[] = [];

  public async save(data: CreateTaskDto, userId: string): Promise<Task> {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description ?? null,
      isDone: false,
      userId,
    };

    this.tasks.push(newTask);

    return newTask;
  }
}
