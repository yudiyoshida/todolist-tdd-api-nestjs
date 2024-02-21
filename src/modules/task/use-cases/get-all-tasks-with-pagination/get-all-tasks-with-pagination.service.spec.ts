import { Test, TestingModule } from '@nestjs/testing';

import { TOKENS } from 'src/shared/di/tokens';
import { PaginationService } from 'src/shared/helpers/pagination/pagination.service';
import { ITaskDto } from '../../entities/task.entity';
import { GetAllTasksWithPaginationService } from './get-all-tasks-with-pagination.service';

describe('GetAllTasksWithPaginationService', () => {
  let service: GetAllTasksWithPaginationService;

  const tasks: ITaskDto[] = [
    {
      id: 'ID1',
      title: 'task 01',
      description: 'description of task 01',
      isDone: false,
      accountId: 'accountID',
    },
    {
      id: 'ID2',
      title: 'task 02',
      description: null,
      isDone: true,
      accountId: 'accountID',
    },
  ];

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllTasksWithPaginationService,
        PaginationService,
        {
          provide: TOKENS.ITaskRepository,
          useFactory: () => ({
            findAllWithPagination: jest.fn().mockResolvedValue([tasks, tasks.length]),
          }),
        },
      ],
    }).compile();

    service = module.get<GetAllTasksWithPaginationService>(GetAllTasksWithPaginationService);
  });

  it('should return all tasks in one page', async() => {
    const page = 1;
    const size = 10;

    const result = await service.execute(page, size);

    expect(result.data).toHaveLength(2);
    expect(result.currentPage).toBe(1);
    expect(result.itemsPerPage).toBe(10);
    expect(result.totalItems).toBe(2);
    expect(result.totalPages).toBe(1);
  });
});
