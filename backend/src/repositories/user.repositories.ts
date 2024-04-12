import { ISignupRequest, ILoginRequest } from '../interfaces/user.interface';
import { IResponse } from '../interfaces/common.interfaces';
import { v4 as uuidv4 } from 'uuid';
import * as utils from '../utils/utils';
import { RequestError } from '../utils/errors';
import { Dynamodb } from '../models/common.model';

export const login = async (payload: ILoginRequest): Promise<IResponse> => {
  try {
    const { email, password: userPassword } = payload;

    const condition = 'email = :param';
    const parameters = {
      ':param': email.toLowerCase(),
    };

    const userExist = await Dynamodb.getRecord({
      tableName: 'users',
      indexTableName: 'user_email',
      conditionExpression: condition,
      parameter: parameters,
    });

    if (userExist.length === 0) {
      throw new RequestError({
        code: 400,
        message: 'Account not found',
      });
    }

    const { password, userId, name } = userExist[0];

    const isValid = await utils.comparePassword(userPassword, password);

    if (!isValid) {
      throw new RequestError({
        code: 400,
        message: 'Invalid credential',
      });
    }

    const token = await utils.jwtToken({
      name,
      email,
      userId,
    });

    const updateCondition = {
      userId,
    };

    const updateParameters = {
      ':token': token,
    };

    const update = 'set verification_token = :token';
    await Dynamodb.updateRecord({
      tableName: 'users',
      conditionExpression: updateCondition,
      updateExpression: update,
      parameter: updateParameters,
    });

    return {
      code: 200,
      message: 'successfully login',
      data: {
        token,
        email,
        name,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const signup = async (payload: ISignupRequest): Promise<IResponse> => {
  try {
    const { email, password, name } = payload;

    const hashPassword = await utils.hashPassword(password);
    const id = uuidv4();

    const condition = 'email = :param';
    const parameters = {
      ':param': email.toLowerCase(),
    };

    const alreadyExist = await Dynamodb.getRecord({
      tableName: 'users',
      indexTableName: 'user_email',
      conditionExpression: condition,
      parameter: parameters,
    });

    if (alreadyExist.length > 0) {
      throw new RequestError({
        code: 400,
        message: 'User already exist',
      });
    }

    await Dynamodb.insert({
      tableName: 'users',
      data: {
        userId: id,
        email,
        name,
        password: hashPassword,
        verification_token: '',
      },
    });

    return {
      code: 200,
      message: 'successfully registered',
      data: {},
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
