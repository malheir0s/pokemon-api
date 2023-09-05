import { DynamoDB } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ResultsDTO } from '../sync/dto/syncAll.dto';
import { PokemonDTO  } from '../pokemon/dtos/pokemon.dto'

@Injectable()
export class DBService {
    private dynamoDB: DynamoDB

    tableName = (process.env.NODE_ENV === 'test') ? 'pokemon' : 'test-pokemon';

    constructor() {
        this.dynamoDB = new DynamoDB({
            apiVersion: process.env.DYNAMO_DB_API_VERSION,
            region: process.env.DYNAMO_DB_REGION,
            endpoint: process.env.DYNAMO_DB_ENDPOINT,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        })
    }

    async insertPokemons(pokemons: ResultsDTO[]): Promise<Boolean> {
        const requests = pokemons.map((item) => {
            return {
                PutRequest: {
                    Item: {
                        name: {
                            S: item.name
                        },
                        id: {
                            N: item.id
                        },
                        url: {
                            S: item.url
                        }
                    }
                }
            }
        });
        const params: DynamoDB.BatchWriteItemInput = {
            RequestItems: {
                [this.tableName]: requests
            }
        };

        return new Promise<Boolean>((resolve, reject) => {
            this.dynamoDB.batchWriteItem(params, function (err, data) {
                if (err) {
                    console.log(err);
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        })

    }

    async getAll() {
        this.dynamoDB.scan({ TableName: this.tableName }, function (err, data) {
            if (err) {
                console.log(err)
                throw "Error scanning table."
            }
            else {
                return data.Items;
            }
        });
    }

    async updatePokemon(data: PokemonDTO) {
        const {id, name, url, height, weight, types, abilities} = data;
        const params = {
            Item: {
                "name": {
                    S: name
                },
                "id": {
                    N: id
                },
                "url": {
                    S: url
                },
                "height": {
                    N: height.toString()
                },
                "weight": {
                    N: weight.toString()
                },
                "abilities": {
                    SS: abilities
                },
                "types": {
                    SS: types
                }
            },
            ReturnConsumedCapacity: "TOTAL",
            TableName: this.tableName
        };

        this.dynamoDB.putItem(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                throw "Error updating pokemon";
            }
            else {
                return data;
            };

        });

    }

    async getPokemonByNameOrId() {

    }

    async getPokemonByType() {

    }

}