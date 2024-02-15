import { Body, Controller, Post } from '@nestjs/common';

import { CreateTaskDto } from './dtos/create-task.dto';
import { CreateTaskService } from './create-task.service';

@Controller('tasks')
export class CreateTaskController {
  constructor(private createTaskService: CreateTaskService) {}

  @Post('/')
  public handle(@Body() data: CreateTaskDto, userId: string) {
    return this.createTaskService.execute(data, userId);
  }
}
