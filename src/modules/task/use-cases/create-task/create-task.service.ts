import { Inject, Injectable } from '@nestjs/common';

import { TOKENS } from 'src/shared/di/tokens';
import { CreateTaskDto } from './dtos/create-task.dto';
import { ITaskRepository } from '../../repositories/task-repository.interface';
import { GetAccountByIdService } from 'src/modules/account/use-cases/get-account-by-id/get-account-by-id.service';

@Injectable()
export class CreateTaskService {
  constructor(
    @Inject(TOKENS.ITaskRepository) private taskRepository: ITaskRepository,
    private getAccountByIdService: GetAccountByIdService
  ) {}

  public async execute(data: CreateTaskDto, accountId: string) {
    const account = await this.getAccountByIdService.execute(accountId);

    return this.taskRepository.save(data, account.id);
  }
}
