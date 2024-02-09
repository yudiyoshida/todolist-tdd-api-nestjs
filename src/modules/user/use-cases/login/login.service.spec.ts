import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { TOKENS } from '@shared/di/tokens';
import { UserInMemoryRepository } from '@modules/user/repositories/adapters/user-in-memory.repository';
import { CreateAccountService } from '../create-account/create-account.service';
import { CreateAccountDto } from '../create-account/dtos/create-account.dto';
import { BadRequestException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { BcryptAdapter } from '@shared/helpers/hashing/adapters/bcrypt';
import { isJWT } from 'class-validator';
import { JwtModule } from '@nestjs/jwt';

describe('LoginService', () => {
  let service: LoginService;
  let createAccountService: CreateAccountService;

  const data: CreateAccountDto = {
    name: 'Jhon Doe',
    email: 'jhondoe@email.com',
    password: 'abc12345',
  };

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET || 'secret-for-tests',
        }),
      ],
      providers: [
        CreateAccountService,
        LoginService,
        {
          provide: TOKENS.IUserRepository,
          useClass: UserInMemoryRepository,
        },
        {
          provide: TOKENS.IHashingHelper,
          useClass: BcryptAdapter,
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
    createAccountService = module.get<CreateAccountService>(CreateAccountService);

    // register an account.
    await createAccountService.execute({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  });

  it('should return 400 when providing incorrect email', async() => {
    // this line is here because a fulfilled promise won't fail the test.
    expect.assertions(2);

    const credentials: LoginDto = {
      email: `${data.email}.br`,
      password: data.password,
    };

    return service.execute(credentials).catch(err => {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.response.message).toBe('Email or password incorrect.');
    });
  });

  it('should return 400 when providing incorrect password', async() => {
    // this line is here because a fulfilled promise won't fail the test.
    expect.assertions(2);

    const credentials: LoginDto = {
      email: data.email,
      password: `${data.password}!!`,
    };

    return service.execute(credentials).catch(err => {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.response.message).toBe('Email or password incorrect.');
    });
  });

  it('should return the access token when providing correct credentials', async() => {
    const credentials: LoginDto = {
      email: data.email,
      password: data.password,
    };

    const result = await service.execute(credentials);

    expect(result).toHaveProperty('accessToken');
  });

  it('should return a valid JWT as access token', async() => {
    const credentials: LoginDto = {
      email: data.email,
      password: data.password,
    };

    const result = await service.execute(credentials);

    expect(isJWT(result.accessToken)).toBeTruthy();
  });
});
