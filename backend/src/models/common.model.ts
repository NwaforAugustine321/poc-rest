import { DataBaseError } from '../utils/errors';
import { dynamodb } from '../utils/database';
import {
  PutCommand,
  ScanCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
  DeleteCommandOutput,
  UpdateCommandOutput,
  ScanCommandOutput,
  PutCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import {
  IDelete,
  IGetRecord,
  IGetRecordWithFilter,
  IInsertItem,
  IUpdate,
} from '../interfaces/dynamodb';

export class Dynamodb {
  static async getRecordWithFilter({
    tableName,
    filter,
    parameter,
    expressionAttributeNames,
    indexTableName,
    selectedAttribute,
    limit,
    exclusiveStartKey,
  }: IGetRecordWithFilter): Promise<Record<string, any>[]> {
    try {
      let params: any = {
        TableName: tableName,
      };

      if (parameter) {
        params['ExpressionAttributeValues'] = parameter;
      }

      if (filter) {
        params['FilterExpression'] = filter;
      }

      if (limit) {
        params['Limit'] = limit;
      }

      if (exclusiveStartKey) {
        params['ExclusiveStartKey'] = exclusiveStartKey;
      }

      if (expressionAttributeNames) {
        params['ExpressionAttributeNames'] = expressionAttributeNames;
      }

      if (selectedAttribute) {
        params['ProjectionExpression'] = selectedAttribute;
      }

      if (indexTableName) {
        params['IndexName'] = indexTableName;
      }

      const response = await dynamodb.send(new ScanCommand(params));
     console.log(response);
      return response.Items ?? [];
    } catch (error) {
      console.log(error);
      throw new DataBaseError({
        message: 'Query error',
        stack: error,
      });
    }
  }

  static async insert({
    tableName,
    data,
  }: IInsertItem): Promise<PutCommandOutput | void> {
    try {
      const params = {
        TableName: tableName,
        Item: data,
      };
      const command = new PutCommand(params);

      await dynamodb.send(command);
    } catch (error: any) {
      console.log(error);
      throw new DataBaseError({
        message: 'Query error',
        stack: error,
      });
    }
  }

  static async updateRecord({
    tableName,
    conditionExpression,
    updateExpression,
    parameter,
    indexTableName,
    conditionAttributeNames,
  }: IUpdate): Promise<UpdateCommandOutput> {
    try {
      const params: any = {
        Key: conditionExpression,
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: parameter,
        TableName: tableName,
        ReturnValues: 'UPDATED_NEW',
      };

      if (indexTableName) {
        params['IndexName'] = indexTableName;
      }

      if (conditionAttributeNames) {
        params['ExpressionAttributeNames'] = conditionAttributeNames;
      }

      const response = await dynamodb.send(new UpdateCommand(params));
      return response;
    } catch (error) {
      throw {
        isError: true,
        error,
      };
    }
  }

  static async getRecord({
    tableName,
    indexTableName,
    conditionExpression,
    parameter,
    limit,
    ExclusiveStartKey,
    select,
    selectAttributes,
  }: IGetRecord): Promise<Record<string, any>[]> {
    try {
      let params: any = {
        KeyConditionExpression: conditionExpression,
        ExpressionAttributeValues: parameter,
        TableName: tableName,
      };

      if (limit) {
        params['Limit'] = limit;
      }

      if (ExclusiveStartKey) {
        params['ExclusiveStartKey'] = ExclusiveStartKey;
      }

      if (indexTableName) {
        params['IndexName'] = indexTableName;
      }
      if (select == 'SPECIFIC_ATTRIBUTES') {
        params['select'] = select;
        params['ProjectionExpression'] = selectAttributes;
      }
      const response = await dynamodb.send(new QueryCommand(params));

      return response.Items ?? [];
    } catch (error) {
      throw new DataBaseError({
        message: 'Query error',
        stack: error,
      });
    }
  }

  static async deleteRecord({
    condition,
    tableName,
    expressionCondition,
    parameter,
  }: IDelete): Promise<DeleteCommandOutput> {
    try {
      let params: any = {
        Key: condition,
        TableName: tableName,
      };

      if (expressionCondition) {
        params['ConditionExpression'] = expressionCondition;
      }

      if (parameter) {
        params['ExpressionAttributeValues'] = parameter;
      }

      const response = await dynamodb.send(new DeleteCommand(params));

      return response;
    } catch (error) {
      throw new DataBaseError({
        message: 'Query error',
        stack: error,
      });
    }
  }
  static async getAllRecord(tableName: string): Promise<Record<string, any>[]> {
    try {
      let params = {
        TableName: tableName,
      };

      const response = await dynamodb.send(new ScanCommand(params));
      return response.Items ?? [];
    } catch (error) {
      throw new DataBaseError({
        message: 'Query error',
        stack: error,
      });
    }
  }
}
