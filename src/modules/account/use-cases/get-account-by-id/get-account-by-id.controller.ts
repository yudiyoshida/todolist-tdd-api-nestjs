import { Controller, Get, Param } from '@nestjs/common';
import { Params } from 'src/shared/dtos/params.dto';
import { GetAccountByIdService } from './get-account-by-id.service';

@Controller('accounts')
export class GetAccountByIdController {
  constructor(private getAccountByIdService: GetAccountByIdService) {}

  @Get('/:id')
  public handle(@Param() params: Params) {
    return this.getAccountByIdService.execute(params.id);
  }
}
