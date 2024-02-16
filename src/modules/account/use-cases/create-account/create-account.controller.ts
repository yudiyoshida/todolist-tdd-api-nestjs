import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags, OmitType } from '@nestjs/swagger';

import { Account } from 'src/modules/account/entities/account.entity';
import { CreateAccountDto } from './dtos/create-account.dto';
import { CreateAccountService } from './create-account.service';
import { ClientError, ServerError } from 'src/shared/errors/error.entity';

@Controller('accounts')
export class CreateAccountController {
  constructor(private createAccountService: CreateAccountService) {}

  @ApiTags('Criar conta')
  @ApiOperation({
    summary: 'Rota utilizada para criar uma nova conta',
  })
  @ApiCreatedResponse({ type: OmitType(Account, ['password']) })
  @ApiBadRequestResponse({ type: ClientError })
  @ApiConflictResponse({ type: ClientError })
  @ApiInternalServerErrorResponse({ type: ServerError })
  @Post('create-account')
  public handle(@Body() data: CreateAccountDto) {
    return this.createAccountService.execute(data);
  }
}
