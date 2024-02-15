import { Test, TestingModule } from '@nestjs/testing';

import { CreateTaskController } from './create-task.controller';
import { CreateTaskService } from './create-task.service';
import { CreateTaskDto } from './dtos/create-task.dto';

describe('CreateTaskController', () => {
  let controller: CreateTaskController;
  let serviceMock: CreateTaskService;

  const data: CreateTaskDto = {
    title: 'Task 01',
    description: 'Descrição da task 01',
  };
  const userId = 'USERID123';

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateTaskController],
      providers: [
        {
          provide: CreateTaskService,
          useFactory: () => ({
            execute: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    controller = module.get<CreateTaskController>(CreateTaskController);
    serviceMock = module.get<CreateTaskService>(CreateTaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service only once', async() => {
    await controller.handle(data, userId);

    expect(serviceMock.execute).toHaveBeenCalledTimes(1);
  });

  it('should call the service with the correct arguments', async() => {
    await controller.handle(data, userId);

    expect(serviceMock.execute).toHaveBeenCalledWith(data, userId);
  });
});
