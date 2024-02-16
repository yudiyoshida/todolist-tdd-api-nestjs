import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const Auth = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const { auth } = ctx.switchToHttp().getRequest<Request>();

  return auth;
});
