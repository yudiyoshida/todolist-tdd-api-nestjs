import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { GetAccountByIdService } from 'src/modules/account/use-cases/get-account-by-id/get-account-by-id.service';
import { PERMISSION_KEY } from '../../decorators/set-permission.decorator';
import { AccountPermissionsEnum } from '../../enums/permissions.enum';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private getAccountByIdService: GetAccountByIdService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.getAllAndOverride<AccountPermissionsEnum>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    try {
      if (!permission) {
        throw new Error();
      }

      const request = context.switchToHttp().getRequest<Request>();
      const account = await this.getAccountByIdService.execute(request.auth.sub);

      const hasPermission = account.permissions.some(item => item.action === permission);
      if (!hasPermission) {
        throw new Error();
      }
      return true;

    } catch {
      throw new ForbiddenException('Você não possui permissão para acessar este recurso.');

    }
  }
}
