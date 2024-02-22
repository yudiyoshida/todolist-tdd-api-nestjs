import { Test, TestingModule } from '@nestjs/testing';

import { GetAccountByIdService } from 'src/modules/account/use-cases/get-account-by-id/get-account-by-id.service';
import { JwtAuthModule } from 'src/modules/auth/jwt.module';
import { PayloadDto } from 'src/modules/auth/types/payload.type';
import { Params } from 'src/shared/dtos/params.dto';
import { DeleteTaskController } from './delete-task.controller';
import { DeleteTaskService } from './delete-task.service';

describe('DeleteTaskController', () => {
  let controller: DeleteTaskController;
  let serviceMock: DeleteTaskService;

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtAuthModule,
      ],
      controllers: [
        DeleteTaskController,
      ],
      providers: [
        {
          provide: DeleteTaskService,
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

    controller = module.get<DeleteTaskController>(DeleteTaskController);
    serviceMock = module.get<DeleteTaskService>(DeleteTaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service only once and with correct arguments', async() => {
    const params: Params = { id: 'TASKID' };
    const acc: PayloadDto = { sub: 'ACCOUNTID' };

    await controller.handle(params, acc);

    expect(serviceMock.execute).toHaveBeenCalledExactlyOnceWith(params.id, acc.sub);
  });
});
