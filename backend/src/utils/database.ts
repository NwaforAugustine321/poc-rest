import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

let options = {
  convertEmptyValues: true,
};

const client = new DynamoDBClient({
  ...options,
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.ACESSKEYID!,
    secretAccessKey: process.env.SECRETACCESSKEY!,
  },
});

export const dynamodb = DynamoDBDocumentClient.from(client);
