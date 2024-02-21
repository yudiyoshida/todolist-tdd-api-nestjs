import { Test, TestingModule } from '@nestjs/testing';

import { GetAccountByIdService } from 'src/modules/account/use-cases/get-account-by-id/get-account-by-id.service';
import { JwtAuthModule } from 'src/modules/auth/jwt.module';
import { GetTaskByIdController } from './get-task-by-id.controller';
import { GetTaskByIdService } from './get-task-by-id.service';

describe('GetTaskByIdController', () => {
  let controller: GetTaskByIdController;
  let serviceMock: GetTaskByIdService;

  const task = { id: 'taskid' };
  const account = { sub: 'accountid' };

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtAuthModule,
      ],
      controllers: [
        GetTaskByIdController,
      ],
      providers: [
        {
          provide: GetTaskByIdService,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
        {
          provide: GetAccountByIdService,
          useClass: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<GetTaskByIdController>(GetTaskByIdController);
    serviceMock = module.get<GetTaskByIdService>(GetTaskByIdService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service only once', async() => {
    await controller.handle(task, account);

    expect(serviceMock.execute).toHaveBeenCalledTimes(1);
  });

  it('should call the service with correct arguments', async() => {
    await controller.handle(task, account);

    expect(serviceMock.execute).toHaveBeenCalledWith(task.id, account.sub);
  });
});
