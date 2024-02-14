import { Trim } from 'src/shared/validators/trim';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString({
    message: 'Título deve ser do tipo string.',
  })
  @IsNotEmpty({
    message: 'Título é um campo obrigatório.',
  })
  @Trim()
  title: string;

  @IsOptional()
  @IsString({
    message: 'Descrição deve ser do tipo string.',
  })
  @Trim()
  description?: string;
}
