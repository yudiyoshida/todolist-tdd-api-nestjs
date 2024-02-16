import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags, OmitType } from '@nestjs/swagger';

import { Account } from 'src/modules/account/entities/account.entity';
import { LoginDto } from './dtos/login.dto';
import { LoginService } from './login.service';
import { ClientError, ServerError } from 'src/shared/errors/error.entity';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @ApiTags('Criar conta')
  @ApiOperation({
    summary: 'Rota utilizada para criar uma nova conta',
  })
  @ApiCreatedResponse({ type: OmitType(Account, ['password']) })
  @ApiBadRequestResponse({ type: ClientError })
  @ApiConflictResponse({ type: ClientError })
  @ApiInternalServerErrorResponse({ type: ServerError })
  @Post('/')
  @HttpCode(HttpStatus.OK)
  public handle(@Body() data: LoginDto) {
    return this.loginService.execute(data);
  }
}
