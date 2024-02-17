import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { AuthorizationGuard } from './authorization.guard';
import { AccountModule } from 'src/modules/account/account.module';

describe('AuthorizationGuard', () => {
  let guard: AuthorizationGuard;

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AccountModule,
      ],
      providers: [
        AuthorizationGuard,
        JwtService,
      ],
    }).compile();

    guard = module.get<AuthorizationGuard>(AuthorizationGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
