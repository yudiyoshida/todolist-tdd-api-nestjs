import { Account } from '../entities/account.entity';
import { CreateAccountDto } from '../use-cases/create-account/dtos/create-account.dto';

export interface IAccountRepository {
  findByEmail(email: string): Promise<Account | null>;
  save(data: CreateAccountDto): Promise<Account>;
}
