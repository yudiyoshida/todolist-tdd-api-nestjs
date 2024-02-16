import { Test, TestingModule } from '@nestjs/testing';

import { TOKENS } from 'src/shared/di/tokens';
import { CreateTaskService } from './create-task.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskInMemoryRepository } from '../../repositories/adapters/task-in-memory.repository';

describe('CreateTaskService', () => {
  let service: CreateTaskService;

  const accountId = 'accountID123';

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTaskService,
        {
          provide: TOKENS.ITaskRepository,
          useClass: TaskInMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<CreateTaskService>(CreateTaskService);
  });

  it('should create a new task', async() => {
    const data: CreateTaskDto = {
      title: 'Task 01',
      description: 'Descrição da task 01',
    };

    const result = await service.execute(data, accountId);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('title', data.title);
    expect(result).toHaveProperty('description', data.description);
    expect(result).toHaveProperty('isDone', false);
    expect(result).toHaveProperty('accountId', accountId);
  });

  it('should create a new task even not providing a description', async() => {
    const data: CreateTaskDto = {
      title: 'Task 01',
    };

    const result = await service.execute(data, accountId);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('title', data.title);
    expect(result).toHaveProperty('description', null);
    expect(result).toHaveProperty('isDone', false);
    expect(result).toHaveProperty('accountId', accountId);
  });

  it('should create a new task when providing null to description', async() => {
    const data: CreateTaskDto = {
      title: 'Task 01',
      description: null,
    };

    const result = await service.execute(data, accountId);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('title', data.title);
    expect(result).toHaveProperty('description', null);
    expect(result).toHaveProperty('isDone', false);
    expect(result).toHaveProperty('accountId', accountId);
  });
});
