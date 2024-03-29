import { Body, Controller, Post } from '@nestjs/common';

import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { RequiredPermission } from 'src/modules/auth/decorators/required-permission.decorator';
import { AccountPermissionsEnum } from 'src/modules/auth/enums/permissions.enum';
import { Swagger } from 'src/shared/decorators/swagger';
import { PayloadDto } from '../../../auth/types/payload.type';
import { Task } from '../../entities/task.entity';
import { CreateTaskService } from './create-task.service';
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller()
export class CreateTaskController {
  constructor(private createTaskService: CreateTaskService) {}

  @Post()
  @RequiredPermission(AccountPermissionsEnum.TASK_CREATE_ONE)
  @Swagger({
    tags: ['Tasks'],
    summary: 'Rota utilizada para criar uma nova task',
    createdResponse: Task,
    applyBadRequest: true,
  })
  public handle(@Body() data: CreateTaskDto, @Auth() account: PayloadDto) {
    return this.createTaskService.execute(data, account.sub);
  }
}
