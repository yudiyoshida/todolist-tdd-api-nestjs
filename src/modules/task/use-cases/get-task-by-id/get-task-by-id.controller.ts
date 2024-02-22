import { Controller, Get, Param } from '@nestjs/common';

import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { RequiredPermission } from 'src/modules/auth/decorators/required-permission.decorator';
import { AccountPermissionsEnum } from 'src/modules/auth/enums/permissions.enum';
import { PayloadDto } from 'src/modules/auth/types/payload.type';
import { Swagger } from 'src/shared/decorators/swagger';
import { Params } from 'src/shared/dtos/params.dto';
import { Task } from '../../entities/task.entity';
import { GetTaskByIdService } from './get-task-by-id.service';

@Controller()
export class GetTaskByIdController {
  constructor(private getTaskByIdService: GetTaskByIdService) {}

  @Get(':id')
  @RequiredPermission(AccountPermissionsEnum.TASK_GET_ONE)
  @Swagger({
    tags: ['Tasks'],
    summary: 'Rota utilizada para exibir uma task em específico',
    okResponse: Task,
    applyBadRequest: true,
    applyNotFound: true,
  })
  public handle(@Param() params: Params, @Auth() account: PayloadDto) {
    return this.getTaskByIdService.execute(params.id, account.sub);
  }
}
