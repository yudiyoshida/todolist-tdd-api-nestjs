import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Task } from '../../entities/task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { CreateTaskService } from './create-task.service';
import { ClientError, ServerError } from 'src/shared/errors/error.entity';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { PayloadDto } from 'src/shared/types/payload.type';
import { AuthenticationGuard } from 'src/modules/auth/guards/authentication/authentication.guard';

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
  @UseGuards(AuthenticationGuard)
  public handle(@Body() data: CreateTaskDto, @Auth() account: PayloadDto) {
    return this.createTaskService.execute(data, account.sub);
  }
}
