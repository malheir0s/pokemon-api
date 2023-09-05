import { Injectable } from '@nestjs/common';
import { DBService } from '../database/db.service';

@Injectable()
export class PokemonService {
    constructor(
        private readonly dbService: DBService
    ) { }

    async getAll(){
        return await this.dbService.getAll();;
    }
}