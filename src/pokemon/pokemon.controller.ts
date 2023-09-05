import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private pokemonService: PokemonService) {}

    @Get()
    async getAll() {
        return await this.pokemonService.getAll();
    }

    @Get(':id_or_name')
    async getByIdOrName(@Param('id_or_name') id_or_name: string) {

    }

    @Get('/type/:type')
    async getByType(@Param('type') type: string) {
        
    }

}   