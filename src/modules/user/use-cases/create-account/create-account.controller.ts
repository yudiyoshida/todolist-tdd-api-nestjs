import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags, OmitType } from '@nestjs/swagger';

import { User } from 'src/modules/user/entities/user.entity';
import { ClientError, ServerError } from 'src/shared/errors/error.entity';
import { CreateAccountService } from './create-account.service';
import { CreateAccountDto } from './dtos/create-account.dto';

@Controller('users')
export class CreateAccountController {
  constructor(private createAccountService: CreateAccountService) {}

  @ApiTags('Criar conta')
  @ApiCreatedResponse({ type: OmitType(User, ['password']) })
  @ApiBadRequestResponse({ type: ClientError })
  @ApiConflictResponse({ type: ClientError })
  @ApiInternalServerErrorResponse({ type: ServerError })
  @Post('create-account')
  public handle(@Body() data: CreateAccountDto) {
    return this.createAccountService.execute(data);
  }
}
