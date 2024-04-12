import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.ACESSKEYID! ?? 'AKIA47CRXF63INJRRLOK',
    secretAccessKey:
      process.env.SECRETACCESSKEY! ??
      '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',
  },
});

export default s3;
