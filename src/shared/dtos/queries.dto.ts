import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class Queries {
  @IsOptional()
  @IsPositive({
    message: 'page deve ser um número positivo.',
  })
  @IsInt({
    message: 'page deve ser um número inteiro.',
  })
  page: number;

  @IsOptional()
  @IsPositive({
    message: 'size deve ser um número positivo.',
  })
  @IsInt({
    message: 'size deve ser um número inteiro.',
  })
  size: number;
}
