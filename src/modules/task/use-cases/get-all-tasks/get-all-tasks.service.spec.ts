import { Test, TestingModule } from '@nestjs/testing';

import { TOKENS } from 'src/shared/di/tokens';
import { PaginationService } from 'src/shared/helpers/pagination/pagination.service';
import { TaskInMemoryRepository } from '../../repositories/adapters/task-in-memory.repository';
import { GetAllTasksService } from './get-all-tasks.service';

describe('GetAllTasksService', () => {
  let service: GetAllTasksService;

  const page = 1;
  const size = 10;

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllTasksService,
        PaginationService,
        {
          provide: TOKENS.ITaskRepository,
          useClass: TaskInMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<GetAllTasksService>(GetAllTasksService);
  });

  it('should return all tasks with no pagination (not providing page or size)', async() => {
    const result = await service.execute();

    expect(result).toBeArray();
  });

  it('should return all tasks with no pagination (providing only page)', async() => {
    const result = await service.execute(page, undefined);

    expect(result).toBeArray();
  });

  it('should return all tasks with no pagination (providing only size)', async() => {
    const result = await service.execute(undefined, size);

    expect(result).toBeArray();
  });

  it('should return all tasks with pagination (providing page and size)', async() => {
    const result = await service.execute(page, size);

    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('currentPage');
    expect(result).toHaveProperty('itemsPerPage');
    expect(result).toHaveProperty('totalItems');
    expect(result).toHaveProperty('totalPages');
  });
});
