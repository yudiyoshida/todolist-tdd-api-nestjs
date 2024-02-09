import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';

import { UserModule } from 'src/modules/user/user.module';

describe('CreateAccountController (e2e)', () => {
  let app: INestApplication;

  const endpoint = '/users/create-account';

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

  describe('POST /users/create-account', () => {
    it('should return a 400 error when not providing request body', async() => {
      const result = await request(app.getHttpServer())
        .post(endpoint)
        .send({});

      expect(result.statusCode).toBe(400);
    });
  });
});
