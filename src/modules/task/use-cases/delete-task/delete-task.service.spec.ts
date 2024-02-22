import { Test, TestingModule } from '@nestjs/testing';

import { TOKENS } from 'src/shared/di/tokens';
import { ITaskDto } from '../../entities/task.entity';
import { ITaskRepository } from '../../repositories/task-repository.interface';
import { GetTaskByIdService } from '../get-task-by-id/get-task-by-id.service';
import { DeleteTaskService } from './delete-task.service';

describe('DeleteTaskService', () => {
  let service: DeleteTaskService;
  let getTaskByIdService: GetTaskByIdService;
  let taskRepository: ITaskRepository;

  const task: ITaskDto = {
    id: 'TASKID',
    title: 'Task',
    description: 'Descrição da task',
    isDone: true,
    accountId: 'ACCOUNTID',
  };

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteTaskService,
        {
          provide: TOKENS.ITaskRepository,
          useFactory: () => ({
            delete: jest.fn().mockResolvedValue(task),
          }),
        },
        {
          provide: GetTaskByIdService,
          useFactory: () => ({
            execute: jest.fn().mockResolvedValue(task),
          }),
        },
      ],
    }).compile();

    service = module.get<DeleteTaskService>(DeleteTaskService);
    getTaskByIdService = module.get<GetTaskByIdService>(GetTaskByIdService);
    taskRepository = module.get<ITaskRepository>(TOKENS.ITaskRepository);
  });

  it('should return the deleted task', async() => {
    const result = await service.execute(task.id, task.accountId);

    expect(result).toEqual(task);
  });

  it('should search for specific task with correct arguments', async() => {
    await service.execute(task.id, task.accountId);

    expect(getTaskByIdService.execute).toHaveBeenCalledExactlyOnceWith(task.id, task.accountId);
  });

  it('should call the delete method with correct arguments', async() => {
    await service.execute(task.id, task.accountId);

    expect(taskRepository.delete).toHaveBeenCalledExactlyOnceWith(task.id);
  });
});
