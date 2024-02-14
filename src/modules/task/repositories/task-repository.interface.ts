import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../use-cases/create-task/dtos/create-task.dto';

export interface ITaskRepository {
  save(data: CreateTaskDto, userId: string): Promise<Task>;
}
