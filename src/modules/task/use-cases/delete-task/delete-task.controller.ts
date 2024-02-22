import { Controller, Delete, Param } from '@nestjs/common';

import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { RequiredPermission } from 'src/modules/auth/decorators/required-permission.decorator';
import { AccountPermissionsEnum } from 'src/modules/auth/enums/permissions.enum';
import { PayloadDto } from 'src/modules/auth/types/payload.type';
import { Swagger } from 'src/shared/decorators/swagger';
import { Params } from 'src/shared/dtos/params.dto';
import { Task } from '../../entities/task.entity';
import { DeleteTaskService } from './delete-task.service';

@Controller('tasks')
export class DeleteTaskController {
  constructor(private deleteTaskService: DeleteTaskService) {}

  @Delete('/:id')
  @RequiredPermission(AccountPermissionsEnum.TASK_DELETE_ONE)
  @Swagger({
    tags: ['Tasks'],
    summary: 'Rota utilizada para deletar uma task específica',
    okResponse: Task,
    applyNotFound: true,
  })
  public handle(@Param() params: Params, @Auth() acc: PayloadDto) {
    return this.deleteTaskService.execute(params.id, acc.sub);
  }
}
