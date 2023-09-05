import { Controller, Get, Param} from "@nestjs/common";
import { SyncService } from "./sync.service";


@Controller('sync')
export class SyncController {
    constructor(private syncService: SyncService) {}
    
    @Get()
    async syncAll() {
        return this.syncService.syncAll();
    }

    @Get(':id')
    async syncPokemon(@Param('id') id: String) {
        return this.syncService.syncPokemon(id);;
    }
}