import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { LoginService } from './login.service';

@Controller('users')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public handle(@Body() data: LoginDto) {
    return this.loginService.execute(data);
  }
}
