import {  Request, Response } from 'express';
import * as apiUtils from '../utils/utils';
import * as requestRepo from '../repositories/music.repositories';
import { DataBaseError, RequestError } from '../utils/errors';

export const getAllMusic = async (req: Request, res: Response) => {
  try {
    const response = await requestRepo.getAllMusic();

    return res.status(200).json(apiUtils.buildSuccessResponse(response));
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

export const getUserSubscribedMusic = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const response = await requestRepo.getUserSubscribedMusic(
      user?.userId ?? ''
    );

    return res.status(200).json(apiUtils.buildSuccessResponse(response));
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

export const unsubscribeToMusic = async (req: any, res: Response) => {
  try {
    const { musicId, user } = req.body;

    const payload = {
      musicId,
      userId: user.userId,
    };

    const response = await requestRepo.unsubscribeToMusic(payload);

    return res.status(200).json(apiUtils.buildSuccessResponse(response));
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

export const subscribeToMusic = async (req: any, res: Response) => {
  try {
    const { musicId, user } = req.body;

    const payload = {
      musicId,
      userId: user.userId,
    };

    const response = await requestRepo.subscribeToMusic(payload);

    return res.status(200).json(apiUtils.buildSuccessResponse(response));
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

export const createMusic = async (req: any, res: Response) => {
  try {
    const { title, artist, year, user, web_url, image_url } = req.body;

    const payload = {
      title,
      artist,
      year,
      web_url,
      image_url,
      userId: user.userId,
    };

    const response = await requestRepo.createMusic(payload);

    return res.status(200).json(apiUtils.buildSuccessResponse(response));
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
