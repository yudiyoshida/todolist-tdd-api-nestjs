import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';

import { AccountModule } from 'src/modules/account/account.module';
import { CreateAccountDto } from 'src/modules/account/use-cases/create-account/dtos/create-account.dto';

describe('Create new account (e2e)', () => {
  let app: INestApplication;

  const endpoint = '/accounts';

  const data: CreateAccountDto = {
    name: 'Jhon Doe',
    email: 'jhondoe@email.com',
    password: '123456789',
  };

  beforeEach(async() => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        AccountModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
  });

  describe('POST /accounts/create-account', () => {
    it('should create a new account and return 201 status', async() => {
      const result = await request(app.getHttpServer())
        .post(endpoint)
        .send(data);

      expect(result.statusCode).toBe(201);
      expect(result.body).toHaveProperty('id');
      expect(result.body).toHaveProperty('name', data.name);
      expect(result.body).toHaveProperty('email', data.email);
      expect(result.body).not.toHaveProperty('password');
    });

    it('should return a 400 error when not providing request body', async() => {
      const result = await request(app.getHttpServer())
        .post(endpoint)
        .send({});

      expect(result.statusCode).toBe(400);
    });

    it('should return a 409 error when providing a non unique email', async() => {
      await request(app.getHttpServer())
        .post(endpoint)
        .send(data);

      const result = await request(app.getHttpServer())
        .post(endpoint)
        .send(data);

      expect(result.statusCode).toBe(409);
      expect(result.body).toHaveProperty('message', 'Email já está sendo utilizado.');
    });
  });
});
