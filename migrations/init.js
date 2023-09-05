// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
console.log(process.env.AWS_ENDPOINT)
AWS.config.update({
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

function createParams(tableName) {
    const params = {
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'N'
            },
            {
                AttributeName: 'name',
                AttributeType: 'S'
            },
            {
                AttributeName: 'types',
                AttributeType: 'S'
            },
        ],
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH'
            },
            {
                AttributeName: 'name',
                KeyType: 'RANGE'
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        },
        TableName: tableName,
        StreamSpecification: {
            StreamEnabled: false
        },
        GlobalSecondaryIndexes: [
            {
                IndexName: 'TypesIndex',
                KeySchema: [
                    {
                        AttributeName: 'types',
                        KeyType: 'HASH'
                    }
                ],
                Projection: {
                    ProjectionType: 'ALL'
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1
                }
            }
        ],
    };

    return params;
}


ddb.createTable(createParams('pokemon'), function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Table Pokemons Created");
    }
});


ddb.createTable(createParams('test-pokemon'), function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Table Test Pokemons Created");
    }
});