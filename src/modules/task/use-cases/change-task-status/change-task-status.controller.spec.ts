import { Test, TestingModule } from '@nestjs/testing';

import { GetAccountByIdService } from 'src/modules/account/use-cases/get-account-by-id/get-account-by-id.service';
import { JwtAuthModule } from 'src/modules/auth/jwt.module';
import { ChangeTaskStatusController } from './change-task-status.controller';
import { ChangeTaskStatusService } from './change-task-status.service';

describe('ChangeTaskStatusController', () => {
  let controller: ChangeTaskStatusController;
  let serviceMock: ChangeTaskStatusService;

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtAuthModule,
      ],
      controllers: [
        ChangeTaskStatusController,
      ],
      providers: [
        {
          provide: GetAccountByIdService,
          useValue: jest.fn(),
        },
        {
          provide: ChangeTaskStatusService,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<ChangeTaskStatusController>(ChangeTaskStatusController);
    serviceMock = module.get<ChangeTaskStatusService>(ChangeTaskStatusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service only once with correct arguments', async() => {
    await controller.handle({ id: 'taskID' }, { sub: 'accID' });

    expect(serviceMock.execute).toHaveBeenCalledExactlyOnceWith('taskID', 'accID');
  });
});
