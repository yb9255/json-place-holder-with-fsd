import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/Card';
import type { Post } from '@/entities/post';
import { cn } from '@/shared/lib/style';
import { Link } from 'react-router';
import { ROUTE_CONSTANTS } from '@/shared/routes';

export function PostCard({ post }: { post: Post }) {
  const { id, title, body } = post;

  return (
    <Link to={ROUTE_CONSTANTS.posts.getPostById(id)}>
      <Card className={cn('cursor-pointer', 'w-[25rem]', 'h-[14rem]')}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{body}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
