import { DynamoDB, Endpoint } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ResultsDTO } from '../sync/dto/syncAll.dto';
import { PokemonDTO } from '../pokemon/dtos/pokemon.dto'
import { request } from 'http';

@Injectable()
export class DBService {
    private dynamoDB: DynamoDB
    tableName = (process.env.NODE_ENV === 'test') ? 'pokemon' : 'test-pokemon';
    bytypeTableName = (process.env.NODE_ENV === 'test') ? 'pokemon-by-type' : 'test-pokemon-by-type';
    constructor() {
        this.dynamoDB = new DynamoDB({
            apiVersion: '2012-08-10',
            region: process.env.AWS_REGION,
            endpoint: new Endpoint(process.env.AWS_ENDPOINT),
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        })
    }

    async insertPokemons(pokemons: ResultsDTO[]) {
        const batchSize = 25;
        const batches = [];

        for (let i = 0; i < pokemons.length; i += batchSize) {
            const batch = pokemons.slice(i, i + batchSize);

            const param = batch.map((item) => ({
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
            }))

            batches.push(param);
        }

        for (const batch of batches) {
            const params: DynamoDB.BatchWriteItemInput = {
                RequestItems: {
                    [this.tableName]: batch
                }
            };

            new Promise((resolve) => {
                this.dynamoDB.batchWriteItem(params, (err, data) => {
                    if (err) {
                        console.log(err);
                        resolve(false);
                        throw "error inserting pokemons";
                    }
                });
            });
        }
    }

    async getAll() {
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

        const requests = types.map((item) => {
            return {
                PutRequest: {
                    Item: {
                        name: {
                            S: name
                        },
                        id: {
                            N: id.toString()
                        },
                        type: {
                            S: item
                        }
                    }
                }
            }
        });

        const paramsType: DynamoDB.BatchWriteItemInput = {
            RequestItems: {
                [this.bytypeTableName]: requests
            }
        };

        this.dynamoDB.batchWriteItem(paramsType, function (err, data) {
            if (err) {
                console.log(err);
                throw "Error updating pokemon - insert on types table"
            }
        });

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

    async getPokemonByNameOrId(nameOrId: string): Promise<Array<any>> {

        const keyName = (/^\d+$/.test(nameOrId)) ? 'id' : 'name';
        const keyType = (/^\d+$/.test(nameOrId)) ? 'N' : 'S';
        const indexName = (/^\d+$/.test(nameOrId)) ? null : "pokemonNameIndex"

        const params = {
            TableName: this.tableName,
            IndexName: indexName,
            ExpressionAttributeValues: {
                ":v1": {
                    [keyType]: nameOrId
                }
            },
            KeyConditionExpression: `#${keyName} = :v1`,
            ExpressionAttributeNames: {
                [`#${keyName}`]: keyName,
            }
        };


        return new Promise((resolve, reject) => {
            this.dynamoDB.query(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    throw "Error querying pokemon by name or id."
                }
                else {
                    return resolve(data.Items);
                }
            })

        })

    }

    async getPokemonByType(pokemonType: string): Promise<Array<any>> {
        const params = {
            TableName: this.bytypeTableName,
            ExpressionAttributeValues: {
                ":v2": {
                    S: pokemonType
                }
            },
            ExpressionAttributeNames: {
                "#type": "type"
            },
            KeyConditionExpression: "#type = :v2",
        };

        return new Promise((resolve, reject) => {
            this.dynamoDB.query(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    throw "Error querying pokemon by type."
                }
                else {
                    return resolve(data.Items);
                }
            })

        })
    }


}