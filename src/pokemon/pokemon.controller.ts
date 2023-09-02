import { Controller, Get, Param } from '@nestjs/common';

@Controller('pokemon')
export class PokemonController {

    @Get()
    async getAll() {

    }

    @Get(':id_or_name')
    async getByIdOrName(@Param('id_or_name') id_or_name: string) {

    }

    @Get('/type/:type')
    async getByType(@Param('type') type: string) {

    }

}   