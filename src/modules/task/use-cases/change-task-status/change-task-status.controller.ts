import { Controller, Param, Patch } from '@nestjs/common';

import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { RequiredPermission } from 'src/modules/auth/decorators/required-permission.decorator';
import { AccountPermissionsEnum } from 'src/modules/auth/enums/permissions.enum';
import { PayloadDto } from 'src/modules/auth/types/payload.type';
import { Swagger } from 'src/shared/decorators/swagger';
import { Params } from 'src/shared/dtos/params.dto';
import { Task } from '../../entities/task.entity';
import { ChangeTaskStatusService } from './change-task-status.service';

@Controller()
export class ChangeTaskStatusController {
  constructor(private changeTaskStatusService: ChangeTaskStatusService) {}

  @Patch(':id/update-status')
  @RequiredPermission(AccountPermissionsEnum.TASK_UPDATE_ONE)
  @Swagger({
    tags: ['Tasks'],
    summary: 'Rota utilizada para atualizar o status da task',
    description: 'Essa rota atualiza o valor do campo \'isDone\'.',
    okResponse: Task,
    applyNotFound: true,
  })
  public handle(@Param() params: Params, @Auth() acc: PayloadDto) {
    return this.changeTaskStatusService.execute(params.id, acc.sub);
  }
}
