import { IResponse } from '../interfaces/common.interfaces';
import { v4 as uuidv4 } from 'uuid';
import {
  ICreateMusic,
  IGetMusic,
  ISubscribeToMusic,
} from '../interfaces/music.interface';
import { RequestError } from '../utils/errors';
import axios from 'axios';
import path from 'path';
import s3 from '../utils/s3Client';
import { ObjectCannedACL } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Dynamodb } from '../models/common.model';

export const createMusic = async (
  payload: ICreateMusic
): Promise<IResponse> => {
  try {
    const { title, artist, year, web_url, image_url, userId } = payload;
    const id = uuidv4();

    let streamBuffer;
    let imageExtension;

    try {
      const response = await axios.get(image_url, {
        responseType: 'arraybuffer',
      });
      streamBuffer = response.data;
      imageExtension = path.extname(image_url);
    } catch (error) {
      throw new RequestError({
        code: 400,
        message: 'Image url is invalid',
      });
    }

    const imageUpload = new Upload({
      client: s3,
      params: {
        Bucket: 'tapperbucket',
        Body: streamBuffer,
        ACL: ObjectCannedACL.public_read,
        Key: `${userId}/${uuidv4()}-image${imageExtension}`,
      },
    });

    const imageUploadResponse = await imageUpload.done();

    await Dynamodb.insert({
      tableName: 'music',
      data: {
        musicId: id,
        title,
        artist,
        year,
        web_url,
        music_url: imageUploadResponse.Location,
      },
    });

    return {
      code: 200,
      message: 'Music created successfully',
      data: {},
    };
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export const unsubscribeToMusic = async (
  payload: ISubscribeToMusic
): Promise<IResponse> => {
  try {
    const { musicId, userId } = payload;

    const condition = 'musicId = :param AND userId = :userId';
    const parameters = {
      ':param': musicId,
      ':userId': userId,
    };

    const alreadyExist = await Dynamodb.getRecordWithFilter({
      tableName: 'subscriptions',
      filter: condition,
      parameter: parameters,
    });

    if (alreadyExist.length === 0) {
      throw new RequestError({
        code: 400,
        message: 'Music not found',
      });
    }

    const { subId } = alreadyExist[0];

    const deleteCondition = {
      subId,
    };

    await Dynamodb.deleteRecord({
      tableName: 'subscriptions',
      condition: deleteCondition,
      expressionCondition: `userId = :userId AND subId = :subId`,
      parameter: {
        ':userId': userId,
        ':subId': subId,
      },
    });

    return {
      code: 200,
      message: 'Unsubscribed successfully',
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const subscribeToMusic = async (
  payload: ISubscribeToMusic
): Promise<IResponse> => {
  try {
    const { musicId, userId } = payload;

    const condition = 'musicId = :param AND userId = :userId';
    const parameters = {
      ':param': musicId,
      ':userId': userId,
    };

    // const alreadyExist = await Dynamodb.getRecord({
    //   tableName: 'subscriptions',
    //   indexTableName: 'musicId',
    //   conditionExpression: condition,
    //   parameter: parameters,
    // });

    const alreadyExist = await Dynamodb.getRecordWithFilter({
      tableName: 'subscriptions',
      filter: condition,
      parameter: parameters,
    });

    const music = await Dynamodb.getRecord({
      tableName: 'music',
      indexTableName: 'musicId',
      conditionExpression: 'musicId = :param',
      parameter: {
        ':param': musicId,
      },
    });

    if (alreadyExist.length > 0) {
      throw new RequestError({
        code: 400,
        message: 'Already subscribed to this music',
      });
    }

    const { title, artist, year, web_url, music_url } = music[0];

    await Dynamodb.insert({
      tableName: 'subscriptions',
      data: {
        subId: uuidv4(),
        userId,
        musicId,
        title,
        artist,
        year,
        web_url,
        music_url,
      },
    });

    return {
      code: 200,
      message: 'Subscribed successfully',
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllMusic = async (payload: IGetMusic): Promise<IResponse> => {
  try {
    const { title, artist, year } = payload;

    let filterExpression = '';

    const params: any = {
      TableName: 'music',
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
    };

    if (title) {
      params.ExpressionAttributeValues[':title'] = title;
      filterExpression += 'title = :title';
    }

    if (artist) {
      if (filterExpression) {
        filterExpression += ' AND ';
      }

      params.ExpressionAttributeValues[':artist'] = artist;
      filterExpression += 'artist = :artist';
    }

    if (year) {
      if (filterExpression) {
        filterExpression += ' AND ';
      }

      params.ExpressionAttributeNames = {
        '#year': 'year',
      };

      params.ExpressionAttributeValues[':releaseYear'] = year;
      filterExpression += '#year = :releaseYear';
    }

    console.log(params);

    params.FilterExpression = filterExpression;

    let all_music = [];

    if (Object.keys(params.ExpressionAttributeNames).length === 0) {
      all_music = await Dynamodb.getRecordWithFilter({
        tableName: params.TableName,
        filter: params.FilterExpression,
        parameter: params.ExpressionAttributeValues,
      });
    } else {
      all_music = await Dynamodb.getRecordWithFilter({
        tableName: params.TableName,
        filter: params.FilterExpression,
        parameter: params.ExpressionAttributeValues,
        expressionAttributeNames: params.ExpressionAttributeNames,
      });
    }
      

    return {
      code: 200,
      message: 'All posted music',
      data: all_music,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserSubscribedMusic = async (
  userId: string
): Promise<IResponse> => {
  try {
    const condition = 'userId = :param';
    const parameters = {
      ':param': userId,
    };

    const subscribedMusic = await Dynamodb.getRecord({
      tableName: 'subscriptions',
      indexTableName: 'userId',
      conditionExpression: condition,
      parameter: parameters,
    });

    return {
      code: 200,
      message: 'All subscribed music',
      data: subscribedMusic,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
