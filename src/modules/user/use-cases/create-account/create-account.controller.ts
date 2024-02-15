import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags, OmitType } from '@nestjs/swagger';

import { User } from 'src/modules/user/entities/user.entity';
import { CreateAccountDto } from './dtos/create-account.dto';
import { CreateAccountService } from './create-account.service';
import { ClientError, ServerError } from 'src/shared/errors/error.entity';

@Controller('users')
export class CreateAccountController {
  constructor(private createAccountService: CreateAccountService) {}

  @ApiTags('Criar conta')
  @ApiOperation({
    summary: 'Rota utilizada para criar uma nova conta',
  })
  @ApiCreatedResponse({ type: OmitType(User, ['password']) })
  @ApiBadRequestResponse({ type: ClientError })
  @ApiConflictResponse({ type: ClientError })
  @ApiInternalServerErrorResponse({ type: ServerError })
  @Post('create-account')
  public handle(@Body() data: CreateAccountDto) {
    return this.createAccountService.execute(data);
  }
}
