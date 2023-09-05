import { Injectable } from '@nestjs/common';
import { DBService } from '../database/db.service';

@Injectable()
export class PokemonService {
  constructor(private readonly dbService: DBService) {}

  async getAll() {
    return await this.dbService.getAll();
  }

  async getByType(pokemonType: string): Promise<Array<any>> {
    return await this.dbService.getPokemonByType(pokemonType);
  }

  async getByNameOrId(nameOrId: string): Promise<Array<any>> {
    return await this.dbService.getPokemonByNameOrId(nameOrId);
  }
}
