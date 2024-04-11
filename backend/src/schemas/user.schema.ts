import { z } from 'zod';

export const signupSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Invalid type',
    })
    .trim()
    .email({ message: 'invalid email address' }),
  
  name: z.string({
    required_error: 'Name  is required',
    invalid_type_error: 'Invalid type',
  }),
  
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Invalid type',
    })
    .min(8, { message: 'password must be at least 8' }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Invalid type',
    })
    .trim()
    .email({ message: 'invalid email address' }),
  password: z
    .string({
      required_error: 'Password  is required',
      invalid_type_error: 'Invalid type',
    })
    .min(8, { message: 'password must be at least 8' }),
});


