import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { SyncModule } from './sync/sync.module';

@Module({
  imports: [PokemonModule, SyncModule],
})
export class AppModule {}
