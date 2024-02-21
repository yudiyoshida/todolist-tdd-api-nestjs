import { Injectable } from '@nestjs/common';
import { IHashingHelper } from '../hashing.interface';

import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptAdapter implements IHashingHelper {
  public compare(text: string, hashText: string): boolean {
    return bcrypt.compareSync(text, hashText);
  }

  public hash(text: string, saltOrRounds?: string | number): string {
    return bcrypt.hashSync(text, saltOrRounds || 10);
  }
}
