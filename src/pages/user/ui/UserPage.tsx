import { useUser } from '@/entities/user';
import { cn } from '@/shared/lib/style';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/Avatar';
import { useParams } from 'react-router';

const UserPage = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data: user } = useUser({
    id: Number(userId),
  });

  return (
    <>
      <header className={cn('flex', 'items-center', 'gap-2')}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1>유저 {user.name}</h1>
      </header>
    </>
  );
};

export default UserPage;
