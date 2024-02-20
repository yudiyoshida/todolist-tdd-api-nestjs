import { Inject, Injectable } from '@nestjs/common';
import { TOKENS } from 'src/shared/di/tokens';
import { ITaskRepository } from '../../repositories/task-repository.interface';
import { PaginationService } from 'src/shared/helpers/pagination/pagination.service';

@Injectable()
export class GetAllTasksWithPaginationService {
  constructor(
    @Inject(TOKENS.ITaskRepository) private taskRepository: ITaskRepository,
    private paginationHelper: PaginationService
  ) {}

  public async execute(page: number, size: number) {
    const tasks = await this.taskRepository.findAllWithPagination(page, size);

    return this.paginationHelper.execute(tasks, page, size);
  }
}
