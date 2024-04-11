import {
  QueryCommandOutput,
  DeleteCommandOutput,
  UpdateCommandOutput,
  ScanCommandOutput,
  PutCommandOutput,
  BatchGetCommandOutput,
  BatchWriteCommandOutput,
  BatchWriteCommandInput,
  BatchGetCommandInput,
} from '@aws-sdk/lib-dynamodb';
import {
  DeleteObjectsCommandInput,
  DeleteObjectsCommandOutput,
} from '@aws-sdk/client-s3';

export interface IDynamoDB {
  insert(
    tableName: string,
    data: { [key: string]: any }
  ): Promise<PutCommandOutput | void>;

  getRecord(
    tableName: string,
    indexTableName: string,
    conditionExpression: any,
    parameter: { [key: string]: any },
    limit?: number,
    ExclusiveStartKey?: { [key: string]: any }
  ): Promise<QueryCommandOutput>;

  getAllRecord(tableName: string): Promise<ScanCommandOutput>;

  deleteRecord(
    tableName: string,
    condition: { [key: string]: any }
  ): Promise<DeleteCommandOutput>;

  getRecordWithFilter(
    tableName: string,
    filter: string,
    parameter: { [key: string]: any },
    expressionAttributeNames?: { [key: string]: any } | string,
    indexTableName?: string,
    selectedAttribute?: string,
    limit?: number,
    ExclusiveStartKey?: { [key: string]: any }
  ): Promise<ScanCommandOutput>;

  updateRecord(
    tableName: string,
    conditionExpression: { [key: string]: any },
    updateExpression: string,
    parameter: any,
    indexTableName?: string,
    conditionAttributeNames?: { [key: string]: any } | string
  ): Promise<UpdateCommandOutput>;

  getBatchItems(params: BatchGetCommandInput): Promise<BatchGetCommandOutput>;

  writeBatchItems(
    params: BatchWriteCommandInput
  ): Promise<BatchWriteCommandOutput>;

  deleteS3Objects(
    params: DeleteObjectsCommandInput
  ): Promise<DeleteObjectsCommandOutput>;
}

export interface IGetRecordWithFilter {
  tableName: string;
  filter: string;
  parameter: { [key: string]: any };
  expressionAttributeNames: string | { [key: string]: any };
  indexTableName: string;
  selectedAttribute: string;
  limit: number;
  exclusiveStartKey: { [key: string]: string };
}

export interface IGetRecord {
  tableName: string;
  indexTableName: string;
  conditionExpression: any;
  parameter: { [key: string]: any };
  limit?: number;
  ExclusiveStartKey?: { [key: string]: string };
  select?: string;
  selectAttributes?: string;
}

export interface IInsertItem {
  tableName: string;
  data: { [key: string]: any };
}

export interface IUpdate {
  tableName: string;
  conditionExpression: { [key: string]: any };
  updateExpression: string;
  parameter: any;
  indexTableName?: string;
  conditionAttributeNames?: string;
}

export interface IDelete {
  tableName: string;
  condition: { [key: string]: any };
}
