import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountService } from './create-account.service';
import { CreateAccountDto } from './dtos/create-account.dto';

@Controller('users')
export class CreateAccountController {
  constructor(private createAccountService: CreateAccountService) {}

  @Post('create-account')
  public handle(@Body() data: CreateAccountDto) {
    return this.createAccountService.execute(data);
  }
}
