import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SyncService {
    constructor(private readonly httpService: HttpService) {}
}