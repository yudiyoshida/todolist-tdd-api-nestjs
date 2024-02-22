import { ITaskDto } from '../entities/task.entity';
import { CreateTaskDto } from '../use-cases/create-task/dtos/create-task.dto';

export interface ITaskRepository {
  findAllWithPagination(page: number, size: number): Promise<[ITaskDto[], number]>;
  findAllNoPagination(): Promise<ITaskDto[]>;
  findById(id: string, accountId: string): Promise<ITaskDto | null>;
  save(data: CreateTaskDto, accountId: string): Promise<ITaskDto>;
  updateStatus(id: string, status: boolean): Promise<ITaskDto>;
  delete(id: string): Promise<ITaskDto>;
}
