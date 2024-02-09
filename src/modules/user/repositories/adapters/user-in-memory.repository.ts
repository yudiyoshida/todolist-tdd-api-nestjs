import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

import { User } from '../../entities/user.entity';
import { CreateAccountDto } from '../../use-cases/create-account/dtos/create-account.dto';
import { IUserRepository } from '../user-repository.interface';

@Injectable()
export class UserInMemoryRepository implements IUserRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email);
  }

  public async save(data: CreateAccountDto): Promise<User> {
    const newUser = { id: crypto.randomUUID(), ...data };

    this.users.push(newUser);

    return newUser;
  }
}
