import { IsNumberString, IsString } from 'class-validator';

export function transformData(data: SyncAllDTO): ResultsDTO[]{
    return data.results.map((item) => {
        const slicedURL = item.url.split('/');
        const last_but_one_index = slicedURL.length - 2;
        return {
            id: slicedURL[last_but_one_index],
            name: item.name,
            url: item.url
        }
    });
};

export class ResultsDTO{
    @IsNumberString()
    id: string;
    
    @IsString()
    name: string;

    @IsString()
    url: string;
}

export class SyncAllDTO {
    results: ResultsDTO[];
}