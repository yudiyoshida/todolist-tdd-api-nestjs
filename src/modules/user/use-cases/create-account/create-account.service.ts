import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dtos/create-account.dto';
import { IUserRepository } from '../../repositories/user-repository.interface';
import { TOKENS } from '@shared/di/tokens';

@Injectable()
export class CreateAccountService {
  constructor(@Inject(TOKENS.IUserRepository) private userRepository: IUserRepository) {}

  public async execute(data: CreateAccountDto) {
    const isEmailNotUnique = await this.userRepository.findByEmail(data.email);
    if (isEmailNotUnique) {
      throw new ConflictException('Email is already taken.');
    }

    return this.userRepository.save(data);
  }
}
