import { Inject, Injectable } from '@nestjs/common';

import { GetAccountByIdService } from 'src/modules/account/use-cases/get-account-by-id/get-account-by-id.service';
import { TOKENS } from 'src/shared/di/tokens';
import { ITaskRepository } from '../../repositories/task-repository.interface';
import { CreateTaskDto } from './dtos/create-task.dto';

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
