import { z } from 'zod';

export type CreatePostBody = {
  title: string;
  body: string;
  userId: number;
};

export const createPostFormSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  userId: z.number().min(1),
});

export type CreatePostFormSchema = z.infer<typeof createPostFormSchema>;
