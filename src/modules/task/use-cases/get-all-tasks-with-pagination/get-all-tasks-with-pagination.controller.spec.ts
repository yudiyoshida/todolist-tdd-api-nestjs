import { Test, TestingModule } from '@nestjs/testing';

import { GetAccountByIdService } from 'src/modules/account/use-cases/get-account-by-id/get-account-by-id.service';
import { JwtAuthModule } from 'src/modules/auth/jwt.module';
import { GetAllTasksWithPaginationController } from './get-all-tasks-with-pagination.controller';
import { GetAllTasksWithPaginationService } from './get-all-tasks-with-pagination.service';

describe('GetAllTasksWithPaginationController', () => {
  let controller: GetAllTasksWithPaginationController;
  let serviceMock: GetAllTasksWithPaginationService;

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtAuthModule,
      ],
      controllers: [
        GetAllTasksWithPaginationController,
      ],
      providers: [
        {
          provide: GetAllTasksWithPaginationService,
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

    controller = module.get<GetAllTasksWithPaginationController>(GetAllTasksWithPaginationController);
    serviceMock = module.get<GetAllTasksWithPaginationService>(GetAllTasksWithPaginationService);
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
