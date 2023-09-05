import { DynamoDB, Endpoint } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ResultsDTO } from '../sync/dto/syncAll.dto';
import { PokemonDTO } from '../pokemon/dtos/pokemon.dto'

@Injectable()
export class DBService {
    private dynamoDB: DynamoDB
    tableName = (process.env.NODE_ENV === 'test') ? 'pokemon' : 'test-pokemon';

    constructor() {
        this.dynamoDB = new DynamoDB({
            apiVersion: '2012-08-10',
            region: process.env.AWS_REGION,
            endpoint: new Endpoint(process.env.AWS_ENDPOINT),
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

    async getAll(){
        return new Promise((resolve, reject) => {

            this.dynamoDB.scan({ TableName: this.tableName }, function (err, data) {
                if (err) {
                    console.log(err)
                    throw "Error scanning table."
                }
                else {
                    return resolve(data.Items);
                }
            });
        })

    }

    async updatePokemon(data: PokemonDTO) {
        const { id, name, height, weight, types, abilities } = data;
        const params = {
            Item: {
                "name": {
                    S: name
                },
                "id": {
                    N: id.toString()
                },
                "height": {
                    N: height.toString()
                },
                "weight": {
                    N: weight.toString()
                },
                "abilities": {
                    S: abilities.toString()
                },
                "types": {
                    S: types.toString()
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