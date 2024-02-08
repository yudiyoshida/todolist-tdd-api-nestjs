import { validate } from 'class-validator';
import { CreateAccountDto } from './create-account.dto';

async function validateDto(dto: CreateAccountDto, field: string) {
  const errors = await validate(dto);

  return errors.find(error => error.property === field);
}

describe('CreateAccountDto', () => {
  const data: CreateAccountDto = {
    name: 'Jhon Doe',
    email: 'jhondoe@email.com',
    password: '123456789',
  };

  describe('name field', () => {
    it('should throw an error when not providing any', async() => {
      const dto = new CreateAccountDto();

      const result = await validateDto(dto, 'name');

      expect(result.constraints).toHaveProperty('isString', 'Nome deve ser do tipo string.');
      expect(result.constraints).toHaveProperty('isNotEmpty', 'Nome é um campo obrigatório.');
    });

    it('should throw an error when providing null as name', async() => {
      const dto = new CreateAccountDto();
      dto.name = null;

      const result = await validateDto(dto, 'name');

      expect(result.constraints).toHaveProperty('isString', 'Nome deve ser do tipo string.');
      expect(result.constraints).toHaveProperty('isNotEmpty', 'Nome é um campo obrigatório.');
    });

    it('should throw an error about invalid type when providing a numeric name', async() => {
      const dto = new CreateAccountDto();
      dto.name = (123 as unknown as string);

      const result = await validateDto(dto, 'name');

      expect(result.constraints).toHaveProperty('isString', 'Nome deve ser do tipo string.');
      expect(result.constraints).not.toHaveProperty('isNotEmpty');
    });

    it('should throw an error about invalid type when providing a boolean name', async() => {
      const dto = new CreateAccountDto();
      dto.name = (true as unknown as string);

      const result = await validateDto(dto, 'name');

      expect(result.constraints).toHaveProperty('isString', 'Nome deve ser do tipo string.');
      expect(result.constraints).not.toHaveProperty('isNotEmpty');
    });
  });

  describe('email field', () => {
    it('should throw an error when not providing any', async() => {
      const dto = new CreateAccountDto();
      dto.name = data.name;

      const result = await validateDto(dto, 'email');

      expect(result.constraints).toHaveProperty('isEmail', 'Email inválido.');
      expect(result.constraints).toHaveProperty('isNotEmpty', 'Email é um campo obrigatório.');
    });

    it('should throw an error when providing null as email', async() => {
      const dto = new CreateAccountDto();
      dto.name = data.name;
      dto.email = null;

      const result = await validateDto(dto, 'email');

      expect(result.constraints).toHaveProperty('isEmail', 'Email inválido.');
      expect(result.constraints).toHaveProperty('isNotEmpty', 'Email é um campo obrigatório.');
    });

    it('should throw an error when providing invalid email', async() => {
      const dto = new CreateAccountDto();
      dto.name = data.name;
      dto.email = 'invalid@@email.com';

      const result = await validateDto(dto, 'email');

      expect(result.constraints).toHaveProperty('isEmail', 'Email inválido.');
      expect(result.constraints).not.toHaveProperty('isNotEmpty');
    });
  });

  describe('password field', () => {
    it('should throw an error when not providing any', async() => {
      const dto = new CreateAccountDto();
      dto.name = data.name;
      dto.email = data.email;

      const result = await validateDto(dto, 'password');

      expect(result.constraints).toHaveProperty('isString', 'Senha deve ser do tipo string.');
      expect(result.constraints).toHaveProperty('isNotEmpty', 'Senha é um campo obrigatório.');
    });

    it('should throw an error when providing null as password', async() => {
      const dto = new CreateAccountDto();
      dto.name = data.name;
      dto.email = data.email;
      dto.password = null;

      const result = await validateDto(dto, 'password');

      expect(result.constraints).toHaveProperty('isString', 'Senha deve ser do tipo string.');
      expect(result.constraints).toHaveProperty('isNotEmpty', 'Senha é um campo obrigatório.');
    });

    it('should throw an error about invalid type when providing a numeric password', async() => {
      const dto = new CreateAccountDto();
      dto.name = data.name;
      dto.email = data.email;
      dto.password = (123 as unknown as string);

      const result = await validateDto(dto, 'password');

      expect(result.constraints).toHaveProperty('isString', 'Senha deve ser do tipo string.');
      expect(result.constraints).not.toHaveProperty('isNotEmpty');
    });

    it('should throw an error about invalid type when providing a boolean password', async() => {
      const dto = new CreateAccountDto();
      dto.name = data.name;
      dto.email = data.email;
      dto.password = (true as unknown as string);

      const result = await validateDto(dto, 'password');

      expect(result.constraints).toHaveProperty('isString', 'Senha deve ser do tipo string.');
      expect(result.constraints).not.toHaveProperty('isNotEmpty');
    });

    it('should throw an error when providing a password with 7 characters', async() => {
      const dto = new CreateAccountDto();
      dto.name = data.name;
      dto.email = data.email;
      dto.password = '1234567';

      const result = await validateDto(dto, 'password');

      expect(result.constraints).not.toHaveProperty('isString');
      expect(result.constraints).not.toHaveProperty('isNotEmpty');
      expect(result.constraints).toHaveProperty('minLength', 'Senha deve conter, no mínimo, 8 caracteres.');
    });
  });

  describe('all fields together', () => {
    it('should return no errors', async() => {
      const dto = new CreateAccountDto();
      dto.name = data.name;
      dto.email = data.email;
      dto.password = data.password;

      const result = await validate(dto);

      expect(result).toHaveLength(0);
    });
  });
});
