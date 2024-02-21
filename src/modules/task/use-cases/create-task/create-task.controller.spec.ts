import { Test, TestingModule } from '@nestjs/testing';

import { GetAccountByIdService } from 'src/modules/account/use-cases/get-account-by-id/get-account-by-id.service';
import { JwtAuthModule } from 'src/modules/auth/jwt.module';
import { PayloadDto } from '../../../auth/types/payload.type';
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
  const account: PayloadDto = {
    sub: 'ID',
  };

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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
        {
          provide: GetAccountByIdService,
          useClass: jest.fn(),
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
