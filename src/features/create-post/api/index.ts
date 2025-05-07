import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { http } from '@/shared/api';
import type { CreatePostBody } from '../model';

export const useCreatePostMutation = (
  options?: UseMutationOptions<CreatePostBody, Error, CreatePostBody>
) =>
  useMutation({
    mutationFn: (body: CreatePostBody) =>
      http.post<CreatePostBody>({ path: 'posts', body }),
    ...options,
  });
