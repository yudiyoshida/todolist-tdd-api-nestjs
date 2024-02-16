import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { isJWT } from 'class-validator';

import { AccountModule } from 'src/modules/account/account.module';
import { LoginDto } from './dtos/login.dto';
import { LoginService } from './login.service';
import { CreateAccountDto } from '../../../account/use-cases/create-account/dtos/create-account.dto';
import { CreateAccountService } from '../../../account/use-cases/create-account/create-account.service';

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
        JwtModule.register({ secret: 'secret-for-tests-only' }),
        AccountModule,
      ],
      providers: [
        CreateAccountService,
        LoginService,
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
      expect(err.response.message).toBe('Credenciais incorretas.');
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
      expect(err.response.message).toBe('Credenciais incorretas.');
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
