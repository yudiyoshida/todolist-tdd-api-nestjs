import { AccountPermission } from '../entities/account-permission.entity';
import { CreateAccountDto } from '../use-cases/create-account/dtos/create-account.dto';
import { IAccountDto } from '../entities/account.entity';

export interface IAccountRepository {
  findById(id: string): Promise<Omit<IAccountDto, 'password'> | null>;
  findByEmail(email: string): Promise<IAccountDto | null>;
  save(data: CreateAccountDto, permissions: AccountPermission[]): Promise<Omit<IAccountDto, 'password' | 'permissions'>>;
}
