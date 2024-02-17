import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { AuthorizationGuard } from './authorization.guard';
import { GetAccountByIdService } from 'src/modules/account/use-cases/get-account-by-id/get-account-by-id.service';

describe('AuthorizationGuard', () => {
  let guard: AuthorizationGuard;

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorizationGuard,
        JwtService,
        {
          provide: GetAccountByIdService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    guard = module.get<AuthorizationGuard>(AuthorizationGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
