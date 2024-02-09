import { validate } from 'class-validator';

export async function validateDto(dto: any, field: string) {
  const errors = await validate(dto);

  return errors.find(error => error.property === field);
}
