import { Body, Controller, Post } from '@nestjs/common';

import { Swagger } from 'src/shared/decorators/swagger';
import { Task } from '../../entities/task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { CreateTaskService } from './create-task.service';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { PayloadDto } from 'src/shared/types/payload.type';

@Controller('tasks')
export class CreateTaskController {
  constructor(private createTaskService: CreateTaskService) {}

  @Post('/')
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
