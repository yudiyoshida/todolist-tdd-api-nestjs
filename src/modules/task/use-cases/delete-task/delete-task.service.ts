import { Inject, Injectable } from '@nestjs/common';

import { TOKENS } from 'src/shared/di/tokens';
import { ITaskRepository } from '../../repositories/task-repository.interface';
import { GetTaskByIdService } from '../get-task-by-id/get-task-by-id.service';

@Injectable()
export class DeleteTaskService {
  constructor(
    @Inject(TOKENS.ITaskRepository) private taskRepository: ITaskRepository,
    private getTaskByIdService: GetTaskByIdService,
  ) {}

  public async execute(id: string, userId: string) {
    const task = await this.getTaskByIdService.execute(id, userId);

    return this.taskRepository.delete(task.id);
  }
}
