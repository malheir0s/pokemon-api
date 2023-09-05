import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { expect } from 'chai';
import { ResultsDTO } from '../../src/sync/dto/syncAll.dto';
import { PokemonDTO } from '../../src/pokemon/dtos/pokemon.dto';

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
      const response = await request(app.getHttpServer()).get('/sync').expect(200);
      expect(response.body).to.be.an('array');

      response.body.forEach((item: ResultsDTO) => {
        expect(item).to.have.property('id').that.is.a('string');
        expect(item).to.have.property('name').that.is.a('string');
        expect(item).to.have.property('url').that.is.a('string');
      });

    });
  });

  describe('syncPokemon', () => {
    describe('inputting an existing pokemon ID', () => {
      it('should update all information of a given pokemon with the data returned from pokemon API request', async () => {
        const response = await request(app.getHttpServer()).get('/sync/1').expect(200);
        expect(response.body).to.have.property('id').that.is.a('number');
        expect(response.body).to.have.property('name').that.is.a('string');
        expect(response.body).to.have.property('types').that.is.a('array');
        expect(response.body).to.have.property('weight').that.is.a('number');
        expect(response.body).to.have.property('height').that.is.a('number');
      });
    });

    describe('inputting an unexisting pokemon ID', () => {
      it('if the id is not numeric, should return an error.', async () => {
        await request(app.getHttpServer()).get('/sync/absc').expect(400);
      });

      it('should return a nout found error.', async () => {
        await request(app.getHttpServer()).get('/sync/99999').expect(400);
      });
    });


  });

  describe('GET /pokemon - getAll', () => {
    it('should return an array with all pokemons', async () => {
      const response = await request(app.getHttpServer()).get('/pokemon').expect(200);
      expect(response.body).to.be.an('array');
      response.body.forEach((item: PokemonDTO) => {
        expect(item).to.have.property('id').that.is.a('object');
        expect(item).to.have.property('name').that.is.a('object');
      })
    });
  });

  describe('GET /pokemon/:id_or_name - getByIdOrName', () => {
    describe('inputting an existing id', () => {
      it('should return the pokemon data.', async () => {
        const response = await request(app.getHttpServer()).get('/pokemon/1').expect(200);
        expect(response.body).to.have.property('id').that.is.a('object');
        expect(response.body).to.have.property('name').that.is.a('object');
        expect(response.body).to.have.property('types').that.is.a('object');
        expect(response.body).to.have.property('weight').that.is.a('object');
        expect(response.body).to.have.property('height').that.is.a('object');
        expect(response.body).to.have.property('abilities').that.is.a('object');
        expect(response.body).to.have.property('types').that.is.a('object');
      });

    });
  });
  describe('inputting an unexisting id', () => {
    it('should return a not found error.', async () => {
      await request(app.getHttpServer()).get('/pokemon/9999999999999999').expect(400);
    });
  });
  describe('inputting an existing name', () => {
    it('should return the pokemon data.', async () => {
      const response = await request(app.getHttpServer()).get('/pokemon/bulbasaur').expect(200);
      expect(response.body).to.have.property('id').that.is.a('object');
      expect(response.body).to.have.property('name').that.is.a('object');
      expect(response.body).to.have.property('types').that.is.a('object');
      expect(response.body).to.have.property('weight').that.is.a('object');
      expect(response.body).to.have.property('height').that.is.a('object');
      expect(response.body).to.have.property('abilities').that.is.a('object');
      expect(response.body).to.have.property('types').that.is.a('object');
    });
  });
  describe('inputting an unexisting name', () => {
    it('should return a not found error.', async () => {
      await request(app.getHttpServer()).get('/pokemon/idonotexistt').expect(400);
    });
  });

  describe('GET /pokemon/type/:type - getByType', () => {
    describe('inputting an existing type', () => {
      it('should return all pokemons with given.', async () => {
        const response = await request(app.getHttpServer()).get('/pokemon/type/grass').expect(200);
        response.body.forEach((item: PokemonDTO) => {
          expect(item).to.have.property('id').that.is.a('object');
          expect(item).to.have.property('name').that.is.a('object');
          expect(item).to.have.property('type').that.is.a('object');
        })
      });
    });
    describe('inputting an unexisting type', () => {
      it('should return a not found error.', async () => {
        await request(app.getHttpServer()).get('/pokemon/type/typethatdoesnotexist').expect(400);
      });
    });
  });
});