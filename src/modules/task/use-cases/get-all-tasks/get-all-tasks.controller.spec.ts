import { Test, TestingModule } from '@nestjs/testing';

import { GetAccountByIdService } from 'src/modules/account/use-cases/get-account-by-id/get-account-by-id.service';
import { JwtAuthModule } from 'src/modules/auth/jwt.module';
import { GetAllTasksController } from './get-all-tasks.controller';
import { GetAllTasksService } from './get-all-tasks.service';

describe('GetAllTasksController', () => {
  let controller: GetAllTasksController;
  let serviceMock: GetAllTasksService;

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtAuthModule,
      ],
      controllers: [
        GetAllTasksController,
      ],
      providers: [
        {
          provide: GetAllTasksService,
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

    controller = module.get<GetAllTasksController>(GetAllTasksController);
    serviceMock = module.get<GetAllTasksService>(GetAllTasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service only once', async() => {
    await controller.handle({ page: 1, size: 10 });

    expect(serviceMock.execute).toHaveBeenCalledTimes(1);
  });

  it('should call the service with correct arguments', async() => {
    await controller.handle({ page: 1, size: 10 });

    expect(serviceMock.execute).toHaveBeenCalledWith(1, 10);
  });
});
