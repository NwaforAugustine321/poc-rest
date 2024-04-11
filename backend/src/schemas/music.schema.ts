import { z } from 'zod';

export const musicSubscribeSchema = z.object({
  musicId: z
    .string({
      required_error: 'Music id is required',
      invalid_type_error: 'Invalid type',
    })
    .trim(),
});

export const musicUnSubscribeSchema = z.object({
  musicId: z
    .string({
      required_error: 'Music id is required',
      invalid_type_error: 'Invalid type',
    })
    .trim(),
});

export const musicCreateSchema = z.object({
  title: z
    .string({
      required_error: 'Title type is required',
      invalid_type_error: 'Invalid type',
    })
    .trim(),
  artist: z
    .string({
      required_error: 'Artist type is required',
      invalid_type_error: 'Invalid type',
    })
    .trim(),
  year: z
    .string({
      required_error: 'Year type is required',
      invalid_type_error: 'Invalid type',
    })
    .trim(),
  web_url: z
    .string({
      required_error: 'Web url type is required',
      invalid_type_error: 'Invalid type',
    })
    .trim(),

  image_url: z
    .string({
      required_error: 'Image url type is required',
      invalid_type_error: 'Invalid type',
    })
    .trim(),
});
