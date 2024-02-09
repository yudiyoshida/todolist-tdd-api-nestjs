import { validate } from 'class-validator';

import { LoginDto } from './login.dto';
import { validateDto } from '@shared/validators/validate-dto';

describe('LoginDto', () => {
  const data: LoginDto = {
    email: 'jhondoe@email',
    password: '123456789',
  };

  describe('email field', () => {
    it('should throw an error when not providing any', async() => {
      const dto = new LoginDto();

      const result = await validateDto(dto, 'email');

      expect(result.constraints).toHaveProperty('isNotEmpty', 'Email é um campo obrigatório.');
    });

    it('should throw an error when providing null as email', async() => {
      const dto = new LoginDto();
      dto.email = null;

      const result = await validateDto(dto, 'email');

      expect(result.constraints).toHaveProperty('isNotEmpty', 'Email é um campo obrigatório.');
    });

    it('should throw an error about invalid type when providing a numeric email', async() => {
      const dto = new LoginDto();
      dto.email = (123 as unknown as string);

      const result = await validateDto(dto, 'email');

      expect(result.constraints).toHaveProperty('isString', 'Email deve ser do tipo string.');
    });

    it('should throw an error about invalid type when providing a boolean email', async() => {
      const dto = new LoginDto();
      dto.email = (true as unknown as string);

      const result = await validateDto(dto, 'email');

      expect(result.constraints).toHaveProperty('isString', 'Email deve ser do tipo string.');
    });
  });

  describe('password field', () => {
    it('should throw an error when not providing any', async() => {
      const dto = new LoginDto();
      dto.email = data.email;

      const result = await validateDto(dto, 'password');

      expect(result.constraints).toHaveProperty('isNotEmpty', 'Senha é um campo obrigatório.');
    });

    it('should throw an error when providing null as password', async() => {
      const dto = new LoginDto();
      dto.email = data.email;
      dto.password = null;

      const result = await validateDto(dto, 'password');

      expect(result.constraints).toHaveProperty('isNotEmpty', 'Senha é um campo obrigatório.');
    });

    it('should throw an error about invalid type when providing a numeric password', async() => {
      const dto = new LoginDto();
      dto.email = data.email;
      dto.password = (123 as unknown as string);

      const result = await validateDto(dto, 'password');

      expect(result.constraints).toHaveProperty('isString', 'Senha deve ser do tipo string.');
    });

    it('should throw an error about invalid type when providing a boolean password', async() => {
      const dto = new LoginDto();
      dto.email = data.email;
      dto.password = (true as unknown as string);

      const result = await validateDto(dto, 'password');

      expect(result.constraints).toHaveProperty('isString', 'Senha deve ser do tipo string.');
    });
  });

  describe('all fields together', () => {
    it('should return no errors', async() => {
      const dto = new LoginDto();
      dto.email = data.email;
      dto.password = data.password;

      const result = await validate(dto);

      expect(result).toHaveLength(0);
    });
  });
});
