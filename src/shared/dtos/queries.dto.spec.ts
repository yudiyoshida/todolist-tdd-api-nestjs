import { Queries } from './queries.dto';
import { getFieldErrors, validateDto } from 'src/shared/validators/validate-dto';

describe('Query', () => {
  describe('page field', () => {
    it('should not throw an error when not providing a value to page', async() => {
      const dto = new Queries();

      const result = validateDto(dto);

      expect(result).toHaveLength(0);
    });

    it('should not throw an error when providing null as page', async() => {
      const dto = new Queries();
      dto.page = null;

      const result = validateDto(dto);

      expect(result).toHaveLength(0);
    });

    it('should throw an error about invalid type when providing a text page', async() => {
      const dto = new Queries();
      dto.page = ('12AB' as unknown as number);

      const result = validateDto(dto);
      const errors = getFieldErrors<Queries>(result, 'page');

      expect(errors.constraints).toHaveProperty('isInt', 'page deve ser um número inteiro.');
    });

    it('should throw an error about invalid type when providing a boolean page', async() => {
      const dto = new Queries();
      dto.page = (false as unknown as number);

      const result = validateDto(dto);
      const errors = getFieldErrors<Queries>(result, 'page');

      expect(errors.constraints).toHaveProperty('isInt', 'page deve ser um número inteiro.');
    });

    it('should throw an error about invalid type when providing a decimal page', async() => {
      const dto = new Queries();
      dto.page = 1.5;

      const result = validateDto(dto);
      const errors = getFieldErrors<Queries>(result, 'page');

      expect(errors.constraints).toHaveProperty('isInt', 'page deve ser um número inteiro.');
    });

    it('should throw an error about invalid type when providing zero as page', async() => {
      const dto = new Queries();
      dto.page = 0;

      const result = validateDto(dto);
      const errors = getFieldErrors<Queries>(result, 'page');

      expect(errors.constraints).toHaveProperty('isPositive', 'page deve ser um número positivo.');
    });

    it('should throw an error about invalid type when providing negative number', async() => {
      const dto = new Queries();
      dto.page = -1;

      const result = validateDto(dto);
      const errors = getFieldErrors<Queries>(result, 'page');

      expect(errors.constraints).toHaveProperty('isPositive', 'page deve ser um número positivo.');
    });
  });

  describe('size field', () => {
    it('should not throw an error when not providing a value to size', async() => {
      const dto = new Queries();

      const result = validateDto(dto);

      expect(result).toHaveLength(0);
    });

    it('should not throw an error when providing null as size', async() => {
      const dto = new Queries();
      dto.size = null;

      const result = validateDto(dto);

      expect(result).toHaveLength(0);
    });

    it('should throw an error about invalid type when providing a text size', async() => {
      const dto = new Queries();
      dto.size = ('12AB' as unknown as number);

      const result = validateDto(dto);
      const errors = getFieldErrors<Queries>(result, 'size');

      expect(errors.constraints).toHaveProperty('isInt', 'size deve ser um número inteiro.');
    });

    it('should throw an error about invalid type when providing a boolean size', async() => {
      const dto = new Queries();
      dto.size = (false as unknown as number);

      const result = validateDto(dto);
      const errors = getFieldErrors<Queries>(result, 'size');

      expect(errors.constraints).toHaveProperty('isInt', 'size deve ser um número inteiro.');
    });

    it('should throw an error about invalid type when providing a decimal size', async() => {
      const dto = new Queries();
      dto.size = 1.5;

      const result = validateDto(dto);
      const errors = getFieldErrors<Queries>(result, 'size');

      expect(errors.constraints).toHaveProperty('isInt', 'size deve ser um número inteiro.');
    });

    it('should throw an error about invalid type when providing zero as size', async() => {
      const dto = new Queries();
      dto.size = 0;

      const result = validateDto(dto);
      const errors = getFieldErrors<Queries>(result, 'size');

      expect(errors.constraints).toHaveProperty('isPositive', 'size deve ser um número positivo.');
    });

    it('should throw an error about invalid type when providing negative number', async() => {
      const dto = new Queries();
      dto.size = -1;

      const result = validateDto(dto);
      const errors = getFieldErrors<Queries>(result, 'size');

      expect(errors.constraints).toHaveProperty('isPositive', 'size deve ser um número positivo.');
    });
  });
});
