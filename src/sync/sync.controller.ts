import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";

@Controller('sync')
export class SyncController {

    @Get()
    async syncAll() {

    }

    @Get('/:id')
    async syncPokemon(@Param('id', ParseIntPipe) id: number) {

    }
}