import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import 'dotenv/config';

let options = {
  convertEmptyValues: true,
};

const client = new DynamoDBClient({
  ...options,
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.ACESSKEYID! ?? 'AKIA47CRXF63INJRRLOK',
    secretAccessKey:
      process.env.SECRETACCESSKEY! ??
      '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',
  },
});

export const dynamodb = DynamoDBDocumentClient.from(client);
