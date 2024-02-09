import { Trim } from '@shared/validators/trim';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString({
    message: 'Email deve ser do tipo string.',
  })
  @IsNotEmpty({
    message: 'Email é um campo obrigatório.',
  })
  @Trim()
  email: string;

  @IsString({
    message: 'Senha deve ser do tipo string.',
  })
  @IsNotEmpty({
    message: 'Senha é um campo obrigatório.',
  })
  @Trim()
  password: string;
}

export class LoginResponseDto {
  accessToken: string;
}
