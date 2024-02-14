import { Test, TestingModule } from '@nestjs/testing';

import { CreateTaskController } from './create-task.controller';
import { CreateTaskService } from './create-task.service';
import { CreateTaskDto } from './dtos/create-task.dto';

describe('CreateTaskController', () => {
  let controller: CreateTaskController;

  const data: CreateTaskDto = {
    title: 'Task 01',
    description: 'Descrição da task 01',
  };

  const mockCreateTaskService = {
    execute: jest.fn().mockResolvedValue({ ...data }),
  };

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateTaskController],
      providers: [CreateTaskService],
    })
      .overrideProvider(CreateTaskService)
      .useValue(mockCreateTaskService)
      .compile();

    controller = module.get<CreateTaskController>(CreateTaskController);
  });

  it('should return the same data that was sent to service', async() => {
    const result = await controller.handle(data);

    expect(result).toEqual(data);
  });
});
