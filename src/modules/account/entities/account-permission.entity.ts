import { AccountPermissionsEnum } from 'src/modules/auth/enums/permissions.enum';

export class AccountPermission {
  id: string;
  action: AccountPermissionsEnum;
  accountId: string;
}
