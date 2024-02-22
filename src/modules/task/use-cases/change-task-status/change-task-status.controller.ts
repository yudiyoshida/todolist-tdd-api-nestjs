import { Controller, Param, Patch } from '@nestjs/common';

import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { RequiredPermission } from 'src/modules/auth/decorators/required-permission.decorator';
import { AccountPermissionsEnum } from 'src/modules/auth/enums/permissions.enum';
import { PayloadDto } from 'src/modules/auth/types/payload.type';
import { Params } from 'src/shared/dtos/params.dto';
import { ChangeTaskStatusService } from './change-task-status.service';

@Controller('tasks')
export class ChangeTaskStatusController {
  constructor(private changeTaskStatusService: ChangeTaskStatusService) {}

  @Patch('/:id/update-status')
  @RequiredPermission(AccountPermissionsEnum.TASK_UPDATE_ONE)
  public handle(@Param() params: Params, @Auth() acc: PayloadDto) {
    return this.changeTaskStatusService.execute(params.id, acc.sub);
  }
}
