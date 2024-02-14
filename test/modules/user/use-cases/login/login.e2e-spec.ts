import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';

import { UserModule } from 'src/modules/user/user.module';
import { LoginDto } from 'src/modules/user/use-cases/login/dtos/login.dto';

describe('Login (e2e)', () => {
  let app: INestApplication;

  const endpoint = '/users/login';

  const data: LoginDto = {
    email: 'jhondoe@email.com',
    password: '123456789',
  };

  beforeEach(async() => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        UserModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
  });

  describe('POST /users/login', () => {
    beforeEach(async() => {
      await request(app.getHttpServer())
        .post('/users/create-account')
        .send({
          name: 'Jhon Doe',
          ...data,
        });
    });

    it('should return a 400 error when not providing credentials', async() => {
      const result = await request(app.getHttpServer())
        .post(endpoint)
        .send({});

      expect(result.statusCode).toBe(400);
    });

    it('should return an accessToken and a 200 status code', async() => {
      const result = await request(app.getHttpServer())
        .post(endpoint)
        .send(data);

      expect(result.statusCode).toBe(200);
      expect(result.body).toHaveProperty('accessToken');
    });
  });
});
