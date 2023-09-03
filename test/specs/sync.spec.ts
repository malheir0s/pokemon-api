import { SyncController } from "../../src/sync/sync.controller";
import { SyncService } from "../../src/sync/sync.service";
import { HttpService } from '@nestjs/axios';


describe('Sync entity', () => {
    let syncController: SyncController;
    let syncService: SyncService;
    let httpService: HttpService;

    beforeEach(() => {
        httpService = new HttpService();
        syncService = new SyncService(httpService);
        syncController = new SyncController();
    });

    describe('syncAll', () => {
        it('should overwrite all pokemon with the data returned from pokemon API request', async () => {

        });
    });

    describe('syncPokemon', () => {
        describe('inputting an existing pokemon ID', () => {
            it('should update all information of a given pokemon with the data returned from pokemon API request', async () => {

            });
        });

        describe('inputting an unexisting pokemon ID', () => {
            it('if the id is not numeric, should return an error.', async () => {

            });

            it('should return a nout found error.', async () => {

            });
        });


    });


});