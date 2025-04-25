import { http } from '@/shared/api';
import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { Post } from '../model';

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
