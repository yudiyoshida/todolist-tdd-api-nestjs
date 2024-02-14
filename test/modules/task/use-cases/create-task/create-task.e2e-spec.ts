import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { TaskModule } from 'src/modules/task/task.module';

describe('Create new task (e2e)', () => {
  let app: INestApplication;

  const endpoint = '/tasks';

  beforeEach(async() => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TaskModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
  });

  describe('POST /tasks', () => {
    it('should return a 400 error when not providing a request body', async() => {
      const result = await request(app.getHttpServer())
        .post(endpoint)
        .send({});

      expect(result.statusCode).toBe(400);
    });
  });
});
