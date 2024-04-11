import { S3Client, ObjectCannedACL } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import axios from 'axios';
import path from 'path';

const s3 = new S3Client({
  credentials: {
    accessKeyId: 'AKIA2OAOZ6P2ESR5NI5D',
    secretAccessKey: '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',
  },
});



export default s3;
