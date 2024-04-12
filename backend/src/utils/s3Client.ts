import { S3Client, ObjectCannedACL } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import axios from 'axios';
import path from 'path';

const s3 = new S3Client({
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.ACESSKEYID!,
    secretAccessKey: process.env.SECRETACCESSKEY!,
  },
});



export default s3;
