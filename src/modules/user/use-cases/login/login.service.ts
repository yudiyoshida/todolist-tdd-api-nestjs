import { IUserRepository } from '@modules/user/repositories/user-repository.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { TOKENS } from '@shared/di/tokens';
import { IHashingHelper } from '@shared/helpers/hashing/hashing.interface';

@Injectable()
export class LoginService {
  constructor(
    @Inject(TOKENS.IUserRepository) private userRepository: IUserRepository,
    @Inject(TOKENS.IHashingHelper) private hashingHelper: IHashingHelper,
  ) {}

  public async execute(credential: LoginDto) {
    const account = await this.userRepository.findByEmail(credential.email);
    if (!account) {
      throw new BadRequestException('Email or password incorrect.');
    }

    const isPassCorrect = this.hashingHelper.compare(credential.password, account.password);
    if (!isPassCorrect) {
      throw new BadRequestException('Email or password incorrect.');
    }

    return { accessToken: 'OK' };
  }
}
