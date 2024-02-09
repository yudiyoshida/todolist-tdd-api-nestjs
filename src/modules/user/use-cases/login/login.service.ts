import { IUserRepository } from '@modules/user/repositories/user-repository.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { TOKENS } from '@shared/di/tokens';
import { IHashingHelper } from '@shared/helpers/hashing/hashing.interface';
import { JwtService } from '@nestjs/jwt';
import { IPayload } from '@shared/interfaces/payload.interface';

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

    const payload: IPayload = { sub: account.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
