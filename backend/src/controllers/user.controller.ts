import { Request, Response } from 'express';
import * as apiUtils from '../utils/utils';
import * as userRepo from '../repositories/user.repositories';
import { DataBaseError, RequestError } from '../utils/errors';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const payload = {
      email,
      password,
    };

    const response = await userRepo.login(payload);

    return res
      .status(response.code ?? 200)
      .json(apiUtils.buildSuccessResponse(response));
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
      return res
        .status(500)
        .json(apiUtils.buildErrorResponse(['Server error']));
    }
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const payload = {
      email,
      password,
      name,
      
    };

    const response = await userRepo.signup(payload);

    return res
      .status(response.code ?? 200)
      .json(apiUtils.buildSuccessResponse(response));
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
      return res
        .status(500)
        .json(apiUtils.buildErrorResponse(['Server error']));
    }
  }
};

