import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Get()
  async getAll() {
    return await this.pokemonService.getAll();
  }

  @Get(':id_or_name')
  async getByIdOrName(@Param('id_or_name') nameOrId: string) {
    const results = await this.pokemonService.getByNameOrId(nameOrId);

    if (!results.length) {
      throw new HttpException(
        'Pokemon with given name or id does not exist in database.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return results[0];
  }

  @Get('/type/:type')
  async getByType(@Param('type') type: string) {
    const results = await this.pokemonService.getByType(type);

    if (!results.length) {
      throw new HttpException(
        'Pokemon with given type does not exist in database.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return results;
  }
}
