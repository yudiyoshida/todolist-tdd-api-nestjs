import { Inject, Injectable } from '@nestjs/common';

import { TOKENS } from 'src/shared/di/tokens';
import { Task } from '../../entities/task.entity';
import { ITaskRepository } from '../../repositories/task-repository.interface';
import { GetTaskByIdService } from '../get-task-by-id/get-task-by-id.service';

@Injectable()
export class ChangeTaskStatusService {
  constructor(
    @Inject(TOKENS.ITaskRepository) private taskRepository: ITaskRepository,
    private getTaskByIdService: GetTaskByIdService,
  ) {}

  public async execute(id: string, userId: string) {
    const data = await this.getTaskByIdService.execute(id, userId);

    const task = new Task(data);
    task.updateStatus();

    return this.taskRepository.updateStatus(task.id, task.isDone);
  }
}
