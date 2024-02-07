import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountService } from './create-account.service';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UserInMemoryRepository } from '../../repositories/adapters/user-in-memory.repository';
import { TOKENS } from '@shared/di/tokens';

describe('CreateAccountService', () => {
  let service: CreateAccountService;

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAccountService,
        UserInMemoryRepository,
        {
          provide: TOKENS.IUserRepository,
          useExisting: UserInMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<CreateAccountService>(CreateAccountService);
  });

  it('create a new account', async() => {
    const data: CreateAccountDto = {
      name: 'Jhon Doe',
      email: 'jhondoe@mail.com',
      password: '123456789',
    };

    const result = await service.execute(data);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name', data.name);
    expect(result).toHaveProperty('email', data.email);
    expect(result).not.toHaveProperty('password');
  });
});
