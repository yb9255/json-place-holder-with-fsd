import { http } from '@/shared/api';
import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { Post, PostComment } from '../model';

export const usePosts = ({
  options,
}: {
  options?: UseSuspenseQueryOptions<Post[]>;
} = {}) =>
  useSuspenseQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () => http.get<Post[]>({ path: 'posts' }),
    ...options,
  });

export const usePost = ({
  id,
  options,
}: {
  id: number;
  options?: UseSuspenseQueryOptions<Post>;
}) =>
  useSuspenseQuery<Post>({
    queryKey: ['posts', id],
    queryFn: () => http.get<Post>({ path: `posts/${id}` }),
    ...options,
  });

export const usePostComments = ({
  id,
  options,
}: {
  id: number;
  options?: UseSuspenseQueryOptions<PostComment[]>;
}) =>
  useSuspenseQuery<PostComment[]>({
    queryKey: ['posts', id, 'comments'],
    queryFn: () => http.get<PostComment[]>({ path: `posts/${id}/comments` }),
    ...options,
  });
