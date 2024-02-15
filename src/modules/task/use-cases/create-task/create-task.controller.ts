import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Task } from '../../entities/task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { CreateTaskService } from './create-task.service';
import { ClientError, ServerError } from 'src/shared/errors/error.entity';

@Controller('tasks')
export class CreateTaskController {
  constructor(private createTaskService: CreateTaskService) {}

  @ApiTags('Tasks')
  @ApiOperation({
    summary: 'Rota utilizada para criar uma nova task',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Task })
  @ApiBadRequestResponse({ type: ClientError })
  @ApiInternalServerErrorResponse({ type: ServerError })
  @Post('/')
  public handle(@Body() data: CreateTaskDto, userId: string) {
    return this.createTaskService.execute(data, userId);
  }
}
