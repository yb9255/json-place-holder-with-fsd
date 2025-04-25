import { http } from '@/shared/api';
import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { User } from '../model';

export const useUser = ({
  id,
  options,
}: {
  id: number;
  options?: UseSuspenseQueryOptions<User>;
}) =>
  useSuspenseQuery<User>({
    queryKey: ['users', id],
    queryFn: () => http.get<User>({ path: `users/${id}` }),
    ...options,
  });
