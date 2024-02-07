import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dtos/create-account.dto';
import { IUserRepository } from '../../repositories/user-repository.interface';
import { TOKENS } from '@shared/di/tokens';

@Injectable()
export class CreateAccountService {
  constructor(@Inject(TOKENS.IUserRepository) private userRepository: IUserRepository) {}

  public execute(data: CreateAccountDto) {
    return this.userRepository.save(data);
  }
}
