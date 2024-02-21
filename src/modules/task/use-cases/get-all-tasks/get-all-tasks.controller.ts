import { Controller, Get, Query } from '@nestjs/common';

import { RequiredPermission } from 'src/modules/auth/decorators/required-permission.decorator';
import { AccountPermissionsEnum } from 'src/modules/auth/enums/permissions.enum';
import { Swagger } from 'src/shared/decorators/swagger';
import { Queries } from 'src/shared/dtos/queries.dto';
import { Task } from '../../entities/task.entity';
import { GetAllTasksService } from './get-all-tasks.service';

@Controller('tasks')
export class GetAllTasksController {
  constructor(private getAllTasksService: GetAllTasksService) {}

  @Get('/')
  @RequiredPermission(AccountPermissionsEnum.TASK_GET_ALL)
  @Swagger({
    tags: ['Tasks'],
    summary: 'Rota utilizada para listar as tasks do usuário logado',
    applyBadRequest: true,
    okResponse: [Task],
    okPaginatedResponse: true,
  })
  public handle(@Query() query: Queries) {
    return this.getAllTasksService.execute(query.page, query.size);
  }
}
