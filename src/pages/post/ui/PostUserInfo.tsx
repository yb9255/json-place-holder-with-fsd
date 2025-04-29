import { useUser } from '@/entities/user/api';
import { ROUTE_CONSTANTS } from '@/shared/routes';
import { cn } from '@/shared/lib/style';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui';
import { Link } from 'react-router';

const PostUserInfo = ({ userId }: { userId: number }) => {
  const { data: user } = useUser({
    id: userId,
  });

  return (
    <header>
      <Link
        to={ROUTE_CONSTANTS.users.getUserById(user.id)}
        className={cn('flex', 'items-center', 'gap-2')}
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className={cn('text-sm', 'text-gray-500')}>{user.name}</span>
      </Link>
    </header>
  );
};

export default PostUserInfo;
