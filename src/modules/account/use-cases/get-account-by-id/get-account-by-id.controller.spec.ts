import { Test, TestingModule } from '@nestjs/testing';

import { GetAccountByIdController } from './get-account-by-id.controller';
import { GetAccountByIdService } from './get-account-by-id.service';

describe('GetAccountByIdController', () => {
  let controller: GetAccountByIdController;
  let serviceMock: GetAccountByIdService;

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAccountByIdController],
      providers: [
        {
          provide: GetAccountByIdService,
          useFactory: () => ({
            execute: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    controller = module.get<GetAccountByIdController>(GetAccountByIdController);
    serviceMock = module.get<GetAccountByIdService>(GetAccountByIdService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service only once', async() => {
    await controller.handle({ id: 'ID-123' });

    expect(serviceMock.execute).toHaveBeenCalledTimes(1);
  });

  it('should call the service with correct arguments', async() => {
    const params = { id: 'ID-123' };

    await controller.handle(params);

    expect(serviceMock.execute).toHaveBeenCalledWith(params.id);
  });
});
