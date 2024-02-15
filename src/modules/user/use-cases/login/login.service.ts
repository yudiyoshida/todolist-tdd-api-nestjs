import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TOKENS } from 'src/shared/di/tokens';
import { PayloadDto } from 'src/shared/types/payload.type';
import { LoginDto } from './dtos/login.dto';
import { IHashingHelper } from 'src/shared/helpers/hashing/hashing.interface';
import { IUserRepository } from '../../repositories/user-repository.interface';

@Injectable()
export class LoginService {
  constructor(
    @Inject(TOKENS.IUserRepository) private userRepository: IUserRepository,
    @Inject(TOKENS.IHashingHelper) private hashingHelper: IHashingHelper,
    private jwtService: JwtService,
  ) {}

  public async execute(credential: LoginDto) {
    const account = await this.userRepository.findByEmail(credential.email);
    if (!account) {
      throw new BadRequestException('Credenciais incorretas.');
    }

    const isPassCorrect = this.hashingHelper.compare(credential.password, account.password);
    if (!isPassCorrect) {
      throw new BadRequestException('Credenciais incorretas.');
    }

    const payload: PayloadDto = { sub: account.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
