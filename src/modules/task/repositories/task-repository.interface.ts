import { ITaskDto } from '../entities/task.entity';
import { CreateTaskDto } from '../use-cases/create-task/dtos/create-task.dto';

export interface ITaskRepository {
  findAllWithPagination(page: number, size: number): Promise<[ITaskDto[], number]>
  save(data: CreateTaskDto, accountId: string): Promise<ITaskDto>;
}
