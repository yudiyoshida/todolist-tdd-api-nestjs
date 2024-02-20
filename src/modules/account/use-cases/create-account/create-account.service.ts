import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { TOKENS } from 'src/shared/di/tokens';
import { IHashingHelper } from 'src/shared/helpers/hashing/hashing.interface';
import { CreateAccountDto } from './dtos/create-account.dto';
import { IAccountRepository } from '../../repositories/account-repository.interface';
import { AccountPermission } from '../../entities/account-permission.entity';
import { AccountPermissionsEnum } from 'src/modules/auth/enums/permissions.enum';

@Injectable()
export class CreateAccountService {
  constructor(
    @Inject(TOKENS.IAccountRepository) private accountRepository: IAccountRepository,
    @Inject(TOKENS.IHashingHelper) private hashingHelper: IHashingHelper
  ) {}

  public async execute(data: CreateAccountDto) {
    const emailIsNotUnique = await this.accountRepository.findByEmail(data.email);
    if (emailIsNotUnique) {
      throw new ConflictException('Email já está sendo utilizado.');
    }

    // hash password.
    data.password = this.hashingHelper.hash(data.password);

    // define permissions.
    const permissions = this.setPermissions();

    return this.accountRepository.save(data, permissions);
  }

  private setPermissions() {
    const permissions: AccountPermission[] = [];

    permissions.push({ action: AccountPermissionsEnum.TASK_CREATE_ONE });
    permissions.push({ action: AccountPermissionsEnum.TASK_DELETE_ONE });
    permissions.push({ action: AccountPermissionsEnum.TASK_GET_ALL });
    permissions.push({ action: AccountPermissionsEnum.TASK_GET_ONE });
    permissions.push({ action: AccountPermissionsEnum.TASK_UPDATE_ONE });

    return permissions;
  }
}
