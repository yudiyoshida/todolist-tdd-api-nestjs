import { Controller, Get, Query } from '@nestjs/common';

import { Task } from '../../entities/task.entity';
import { Swagger } from 'src/shared/decorators/swagger';
import { GetAllTasksWithPaginationService } from './get-all-tasks-with-pagination.service';
import { RequiredPermission } from 'src/modules/auth/decorators/required-permission.decorator';
import { AccountPermissionsEnum } from 'src/modules/auth/enums/permissions.enum';
import { Queries } from 'src/shared/dtos/queries.dto';

@Controller('tasks')
export class GetAllTasksWithPaginationController {
  constructor(private getAllTasksService: GetAllTasksWithPaginationService) {}

  @Get('/')
  @RequiredPermission(AccountPermissionsEnum.TASK_GET_ALL)
  @Swagger({
    tags: ['Tasks'],
    summary: 'Rota utilizada para listar as tasks do usuário logado',
    okResponse: Task,
    applyBadRequest: true,
  })
  public handle(@Query() query: Queries) {
    return this.getAllTasksService.execute(query.page, query.size);
  }
}
