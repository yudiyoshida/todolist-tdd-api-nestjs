import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationGuard } from './authentication.guard';
import { JwtService } from '@nestjs/jwt';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationGuard,
        JwtService,
      ],
    }).compile();

    guard = module.get<AuthenticationGuard>(AuthenticationGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
