import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { LoginDto, LoginResponseDto } from './dtos/login.dto';
import { LoginService } from './login.service';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ClientError, ServerError } from 'src/shared/errors/error.entity';

@Controller('users')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @ApiTags('Login')
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiBadRequestResponse({ type: ClientError })
  @ApiInternalServerErrorResponse({ type: ServerError })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public handle(@Body() data: LoginDto) {
    return this.loginService.execute(data);
  }
}
