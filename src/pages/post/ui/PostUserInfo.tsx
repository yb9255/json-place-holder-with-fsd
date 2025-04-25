import { useUser } from '@/entities/user/api';
import { cn } from '@/shared/lib';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui';

const PostUserInfo = ({ userId }: { userId: number }) => {
  const { data: user } = useUser({
    id: userId,
  });

  return (
    <header className={cn('flex', 'items-center', 'gap-2')}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span className={cn('text-sm', 'text-gray-500')}>{user.name}</span>
    </header>
  );
};

export default PostUserInfo;
