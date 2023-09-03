import { PokemonController } from "../../src/pokemon/pokemon.controller";
import { PokemonService } from "../../src/pokemon/pokemon.service";


describe('Pokemon entity', () => {
    let pokemonController: PokemonController;
    let pokemonService: PokemonService;
  
    beforeEach(() => {
        pokemonService = new PokemonService();
        pokemonController = new PokemonController();
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
  });