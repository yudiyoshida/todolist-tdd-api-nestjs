import { Account } from '../entities/account.entity';
import { CreateAccountDto } from '../use-cases/create-account/dtos/create-account.dto';

export interface IAccountRepository {
  findById(id: string): Promise<Omit<Account, 'password'> | null>;
  findByEmail(email: string): Promise<Account | null>;
  save(data: CreateAccountDto): Promise<Omit<Account, 'password' | 'permissions'>>;
}
