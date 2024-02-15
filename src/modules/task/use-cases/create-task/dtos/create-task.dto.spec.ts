import { CreateTaskDto } from './create-task.dto';
import { getErrorsFromField, validateDto } from 'src/shared/validators/validate-dto';

describe('CreateTaskDto', () => {
  const data: CreateTaskDto = {
    title: ' Task 01 ',
    description: ' Descrição da task 01 ',
  };

  describe('title field', () => {
    it('should throw an error when not providing any', async() => {
      const dto = new CreateTaskDto();

      const result = validateDto(dto);
      const errors = getErrorsFromField<CreateTaskDto>(result, 'title');

      expect(errors.constraints).toHaveProperty('isNotEmpty', 'Título é um campo obrigatório.');
    });

    it('should throw an error when providing null as title', async() => {
      const dto = new CreateTaskDto();
      dto.title = null;

      const result = validateDto(dto);
      const errors = getErrorsFromField<CreateTaskDto>(result, 'title');

      expect(errors.constraints).toHaveProperty('isString', 'Título deve ser do tipo string.');
    });

    it('should throw an error about invalid type when providing a numeric title', async() => {
      const dto = new CreateTaskDto();
      dto.title = (123 as unknown as string);

      const result = validateDto(dto);
      const errors = getErrorsFromField<CreateTaskDto>(result, 'title');

      expect(errors.constraints).toHaveProperty('isString', 'Título deve ser do tipo string.');
    });

    it('should throw an error about invalid type when providing a boolean title', async() => {
      const dto = new CreateTaskDto();
      dto.title = (false as unknown as string);

      const result = validateDto(dto);
      const errors = getErrorsFromField<CreateTaskDto>(result, 'title');

      expect(errors.constraints).toHaveProperty('isString', 'Título deve ser do tipo string.');
    });
  });

  describe('description field', () => {
    it('should not throw an error when not providing any', async() => {
      const dto = new CreateTaskDto();
      dto.title = data.title;

      const result = validateDto(dto);

      expect(result).toHaveLength(0);
    });

    it('should not throw an error when providing null as description', async() => {
      const dto = new CreateTaskDto();
      dto.title = data.title;
      dto.description = null;

      const result = validateDto(dto);

      expect(result).toHaveLength(0);
    });

    it('should throw an error about invalid type when providing a numeric description', async() => {
      const dto = new CreateTaskDto();
      dto.title = data.title;
      dto.description = (123 as unknown as string);

      const result = validateDto(dto);
      const errors = getErrorsFromField<CreateTaskDto>(result, 'description');

      expect(errors.constraints).toHaveProperty('isString', 'Descrição deve ser do tipo string.');
    });

    it('should throw an error about invalid type when providing a boolean description', async() => {
      const dto = new CreateTaskDto();
      dto.title = data.title;
      dto.description = (false as unknown as string);

      const result = validateDto(dto);
      const errors = getErrorsFromField<CreateTaskDto>(result, 'description');

      expect(errors.constraints).toHaveProperty('isString', 'Descrição deve ser do tipo string.');
    });
  });
});
