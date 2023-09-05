import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SyncAllDTO, ResultsDTO, transformData } from './dto/syncAll.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { DBService } from '../database/db.service';
import { PokemonDTO } from '../pokemon/dtos/pokemon.dto';

@Injectable()
export class SyncService {
    constructor(
        private readonly httpService: HttpService,
        private readonly dbService: DBService
    ) { }
    base_url = "https://pokeapi.co/api/v2/pokemon/"


    async syncAll(): Promise<ResultsDTO[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<SyncAllDTO>(this.base_url, {
                params: {
                    limit: 1
                }
            }).pipe(
                catchError((error: AxiosError) => {
                    throw 'error - GET /pokemon';
                }),
            )
        )

        const transformedData = transformData(data);

        this.dbService.insertPokemons(transformedData);

        return transformedData;
    }

    async syncPokemon(reqId: String): Promise<PokemonDTO> {
        const reqUrl = this.base_url + reqId
        const { data } = await firstValueFrom(
            this.httpService.get(reqUrl).pipe(
                catchError((error: AxiosError) => {
                    throw new HttpException('Pokemon not found', HttpStatus.BAD_REQUEST);
                }),
            )

        )
        
        const {id, name, height, weight, url} = data;

        const transformedData = {
            id,
            name,
            height,
            weight,
            url,
            abilities: data.abilities.map((ability) => ability.ability.name),
            types: data.types.map((type) => type.type.name)
        };

        this.dbService.updatePokemon(transformedData);

        return transformedData;
    }
}