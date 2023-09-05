import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { DBModule } from '../database/db.module';

@Module({
    controllers: [PokemonController],
    providers: [PokemonService, DBModule],
})

export class PokemonModule {}