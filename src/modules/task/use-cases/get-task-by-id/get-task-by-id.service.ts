import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { TOKENS } from 'src/shared/di/tokens';
import { ITaskRepository } from '../../repositories/task-repository.interface';

@Injectable()
export class GetTaskByIdService {
  constructor(
    @Inject(TOKENS.ITaskRepository) private taskRepository: ITaskRepository
  ) {}

  public async execute(id: string, userId: string) {
    const task = await this.taskRepository.findById(id, userId);

    if (!task) {
      throw new NotFoundException('Task não encontrada na base de dados.');
    }
    return task;
  }
}
