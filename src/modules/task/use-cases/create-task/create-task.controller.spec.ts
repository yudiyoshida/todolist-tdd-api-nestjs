import { Test, TestingModule } from '@nestjs/testing';

import { CreateTaskController } from './create-task.controller';
import { CreateTaskService } from './create-task.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { JwtAuthModule } from 'src/modules/auth/jwt.module';
import { PayloadDto } from 'src/shared/types/payload.type';
import { AccountModule } from 'src/modules/account/account.module';

describe('CreateTaskController', () => {
  let controller: CreateTaskController;
  let serviceMock: CreateTaskService;

  const data: CreateTaskDto = {
    title: 'Task 01',
    description: 'Descrição da task 01',
  };
  const account: PayloadDto = {
    sub: 'ID',
  };

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AccountModule,
        JwtAuthModule,
      ],
      controllers: [
        CreateTaskController,
      ],
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
    await controller.handle(data, account);

    expect(serviceMock.execute).toHaveBeenCalledTimes(1);
  });

  it('should call the service with correct arguments', async() => {
    await controller.handle(data, account);

    expect(serviceMock.execute).toHaveBeenCalledWith(data, account.sub);
  });
});
