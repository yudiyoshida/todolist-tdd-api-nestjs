import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { TOKENS } from 'src/shared/di/tokens';
import { ITaskDto } from '../../entities/task.entity';
import { ITaskRepository } from '../../repositories/task-repository.interface';
import { GetTaskByIdService } from './get-task-by-id.service';

describe('GetTaskByIdService', () => {
  let service: GetTaskByIdService;
  let repositoryMock: ITaskRepository;

  const task: ITaskDto = {
    id: 'TASK-ID-01',
    title: 'Task 01',
    description: null,
    isDone: false,
    accountId: 'ACCOUNT-ID-01',
  };

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetTaskByIdService,
        {
          provide: TOKENS.ITaskRepository,
          useFactory: () => ({
            findById: jest.fn()
              .mockResolvedValueOnce(task)
              .mockResolvedValueOnce(null),
          }),
        },
      ],
    }).compile();

    service = module.get<GetTaskByIdService>(GetTaskByIdService);
    repositoryMock = module.get<ITaskRepository>(TOKENS.ITaskRepository);
  });

  it('should return the task', async() => {
    const result = await service.execute(task.id, task.accountId);

    expect(result).toEqual(task);
  });

  it('should throw an error when task does not exists', async() => {
    // first value from mock.
    await service.execute(task.id, task.accountId);

    expect.assertions(2);
    // second value from mock.
    return service.execute(task.id, task.accountId).catch(err => {
      expect(err).toBeInstanceOf(NotFoundException);
      expect(err.response.message).toEqual('Task não encontrada na base de dados.');
    });
  });

  it('should call the repository with correct arguments', async() => {
    await service.execute(task.id, task.accountId);

    expect(repositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.findById).toHaveBeenCalledWith(task.id, task.accountId);
  });
});
