import { Inject, Injectable } from '@nestjs/common';

import { TOKENS } from 'src/shared/di/tokens';
import { CreateTaskDto } from './dtos/create-task.dto';
import { ITaskRepository } from '../../repositories/task-repository.interface';

@Injectable()
export class CreateTaskService {
  constructor(
    @Inject(TOKENS.ITaskRepository) private taskRepository: ITaskRepository
  ) {}

  public async execute(data: CreateTaskDto, accountId: string) {
    return this.taskRepository.save(data, accountId);
  }
}
