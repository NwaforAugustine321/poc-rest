import { NextFunction, Request, Response } from 'express';
import { Schema } from 'zod';
import bcrypt from 'bcrypt';
import otpGenerator from 'otp-generator';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const buildSuccessResponse = (data: object | [] | null | void) => {
  return {
    status: 'SUCCESS',
    result: data,
  };
};

export const buildErrorResponse = (errors: string[] | object) => {
  return {
    status: 'ERROR',
    errors,
  };
};

export const validateSchema = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const validation = schema.safeParse(body);

    if (!validation.success) {
      const errors: string[] = [];

      for (const err of validation.error.errors as any) {
        if (err.message) {
          errors.push(err.message);
        }
      }
      return res.status(400).json(buildErrorResponse(errors));
    }

    return next();
  };
};

export const validateSocketSchema = async (
  schema: Schema,
  payload: string | { [key: string]: any } | any
): Promise<string[] | null> => {
  const validation = schema.safeParse(payload);

  if (!validation.success) {
    const errors: string[] = [];

    for (const err of validation.error.errors as any) {
      if (err.message) {
        errors.push(err.message);
      }
    }
    return errors;
  } else {
    return null;
  }
};

export const ioValidateSchema = (schema: Schema, payload: any) => {
  const validation = schema.safeParse(payload);

  if (!validation.success) {
    const errors: string[] = [];

    for (const err of validation.error.errors as any) {
      if (err.message) {
        errors.push(err.message);
      }
    }
    return {
      isError: true,
      errors,
    };
  }

  return {
    isError: false,
    errors: [],
  };
};

export const hashPassword = async (
  password: string,
  salt = 10
): Promise<string> => {
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const optGenerator = async (options?: { [key: string]: any }) => {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    lowerCaseAlphabets: false,
    digits: true,
    specialChars: false,
    ...options,
  });
};

export const jwtToken = async (payload: {
  [key: string]: any;
}): Promise<string> => {
  return await jwt.sign(payload, process.env!.JWT ?? '', { expiresIn: '2h' });
};

export const jwtVerifyToken = async (
  token: string
): Promise<string | JwtPayload> => {
  return await jwt.verify(token, process.env!.JWT ?? '');
};
