import { Test, TestingModule } from '@nestjs/testing';

import { TOKENS } from 'src/shared/di/tokens';
import { ITaskDto } from '../../entities/task.entity';
import { ITaskRepository } from '../../repositories/task-repository.interface';
import { GetTaskByIdService } from '../get-task-by-id/get-task-by-id.service';
import { ChangeTaskStatusService } from './change-task-status.service';

describe('ChangeTaskStatusService', () => {
  let service: ChangeTaskStatusService;
  let repositoryMock: ITaskRepository;

  const task: ITaskDto = {
    id: 'taskID',
    title: 'Task foo',
    description: null,
    isDone: false,
    accountId: 'accID',
  };

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChangeTaskStatusService,
        {
          provide: TOKENS.ITaskRepository,
          useFactory: () => ({
            updateStatus: jest.fn(),
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

    service = module.get<ChangeTaskStatusService>(ChangeTaskStatusService);
    repositoryMock = module.get<ITaskRepository>(TOKENS.ITaskRepository);
  });

  it('should call the repository with opposite status', async() => {
    await service.execute(task.id, task.accountId);

    expect(repositoryMock.updateStatus).toHaveBeenCalledWith(task.id, !task.isDone);
  });
});
