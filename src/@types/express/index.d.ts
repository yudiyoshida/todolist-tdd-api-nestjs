import { IPayload } from 'src/shared/interfaces/payload.interface';

// to make the file a module and avoid the TypeScript error.
export {};

declare global {
  namespace Express {
    export interface Request {
      auth: IPayload;
    }
  }
}
