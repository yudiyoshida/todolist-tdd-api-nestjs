import { getFieldErrors, validateDto } from 'src/shared/validators/validate-dto';
import { Params } from './params.dto';

describe('Params', () => {
  describe('id field', () => {
    it('should throw an error when not providing any', async() => {
      const dto = new Params();

      const result = validateDto(dto);
      const errors = getFieldErrors<Params>(result, 'id');

      expect(errors.constraints).toHaveProperty('isNotEmpty', 'id é um campo obrigatório.');
    });

    it('should throw an error when providing null as id', async() => {
      const dto = new Params();
      dto.id = null;

      const result = validateDto(dto);
      const errors = getFieldErrors<Params>(result, 'id');

      expect(errors.constraints).toHaveProperty('isString', 'id deve ser do tipo string.');
    });

    it('should throw an error about invalid type when providing a numeric id', async() => {
      const dto = new Params();
      dto.id = (123 as unknown as string);

      const result = validateDto(dto);
      const errors = getFieldErrors<Params>(result, 'id');

      expect(errors.constraints).toHaveProperty('isString', 'id deve ser do tipo string.');
    });

    it('should throw an error about invalid type when providing a boolean id', async() => {
      const dto = new Params();
      dto.id = (false as unknown as string);

      const result = validateDto(dto);
      const errors = getFieldErrors<Params>(result, 'id');

      expect(errors.constraints).toHaveProperty('isString', 'id deve ser do tipo string.');
    });
  });
});
