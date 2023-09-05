import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { HttpModule } from '@nestjs/axios';
import { DBModule } from '../../src/database/db.module';

@Module({
    imports: [HttpModule, DBModule],  
    controllers: [SyncController],
    providers: [SyncService],
})

export class SyncModule { }