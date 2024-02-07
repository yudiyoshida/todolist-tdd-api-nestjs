import { User } from '../entities/user.entity';
import { CreateAccountDto } from '../use-cases/create-account/dtos/create-account.dto';

export interface IUserRepository {
  save(data: CreateAccountDto): Promise<User>;
}
