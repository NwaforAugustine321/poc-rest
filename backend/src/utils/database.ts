import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

let options = {
  convertEmptyValues: true,
};

const client = new DynamoDBClient({
  credentials: {
    ...options,
    accessKeyId: 'AKIA2OAOZ6P2ESR5NI5D',
    secretAccessKey: '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',
  },
});

export const dynamodb = DynamoDBDocumentClient.from(client);
