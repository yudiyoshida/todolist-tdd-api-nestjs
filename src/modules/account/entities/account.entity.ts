import { AccountPermissionsEnum } from 'src/modules/auth/enums/permissions.enum';

export class Account {
  id: string;
  name: string;
  email: string;
  password: string;
  permissions: AccountPermissionsEnum[];
}
