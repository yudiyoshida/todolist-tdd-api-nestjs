import { PayloadDto } from 'src/shared/types/payload.type';

// to make the file a module and avoid the TypeScript error.
export {};

declare global {
  namespace Express {
    export interface Request {
      auth: PayloadDto;
    }
  }
}
