import { NextFunction, Response, Request } from 'express';
import { DataBaseError, RequestError } from '../utils/errors';
import { buildErrorResponse } from '../utils/utils';
import * as apiUtils from '../utils/utils';
import { Dynamodb } from '../models/common.model';

export const allowedHttpMethods = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedMethods = ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'];
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json(buildErrorResponse(['Method Not Allowed']));
  }
  return next();
};

export const allowedHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
};

export const authorizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers;

    if (!header.authorization) {
      throw new RequestError({
        code: 401,
        message: 'Unauthorized',
      });
    }

    const signature = (await apiUtils.jwtVerifyToken(
      header.authorization
    )) as any;

    const { email } = signature;

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
        code: 401,
        message: 'Unauthorized',
      });
    }

    const { verification_token } = userExist[0];

    if (header.authorization !== verification_token) {
      throw new RequestError({
        code: 401,
        message: 'Unauthorized',
      });
    }

    req.body.user = signature;
    return next();
  } catch (error) {
    if (error instanceof DataBaseError) {
      return res
        .status(422)
        .json(apiUtils.buildErrorResponse(['Server error']));
    } else if (error instanceof RequestError) {
      return res
        .status(error.code ?? 200)
        .json(apiUtils.buildErrorResponse(error));
    } else {
      return res.status(401).json(
        apiUtils.buildErrorResponse({
          code: 401,
          message: 'Unauthorized',
        })
      );
    }
  }
};
