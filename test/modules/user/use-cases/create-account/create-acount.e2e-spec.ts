import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../../../../../src/app.module';

describe('CreateAccountController (e2e)', () => {
  let app: INestApplication;

  const endpoint = '/users/create-account';

  beforeEach(async() => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('POST /users/create-account', () => {
    it('should return a 400 error when not providing request body', () => {
      return request(app.getHttpServer())
        .get(endpoint)
        .expect(400);
    });
  });
});
