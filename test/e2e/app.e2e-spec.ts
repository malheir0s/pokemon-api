import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /sync - syncAll', () => {
    it('should overwrite all pokemon with the data returned from pokemon API request', async () => {
      return request(app.getHttpServer())
        .get('/sync')
        .expect(200)
    });
  });
});

describe('syncPokemon', () => {
  describe('inputting an existing pokemon ID', () => {
    it('should update all information of a given pokemon with the data returned from pokemon API request', async () => {

    });
  });

  describe('inputting an unexisting pokemon ID', () => {
    it('if the id is not numeric, should return an error.', async () => {

    });

    it('should return a nout found error.', async () => {

    });
  });


});

describe('getAll', () => {
  it('should return an array with all pokemons', async () => {

  });
});

describe('getByIdOrName', () => {
  describe('inputting an existing id', () => {
    it('should return the pokemon data.', async () => {

    });
  });
  describe('inputting an unexisting id', () => {
    it('should return a not found error.', async () => {

    });
  });
  describe('inputting an existing name', () => {
    it('should return the pokemon data.', async () => {

    });
  });
  describe('inputting an existing id', () => {
    it('should return a not found error.', async () => {

    });
  });
});

describe('getByType', () => {
  describe('inputting an existing type', () => {
    it('should return all pokemons with given.', async () => {

    });
  });
  describe('inputting an unexisting type', () => {
    it('should return a not found error.', async () => {

    });
  });
});
