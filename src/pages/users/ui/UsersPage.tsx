import { useUsers } from '@/entities/user/api';
import { cn } from '@/shared/lib/style';
import { ROUTE_CONSTANTS } from '@/shared/routes';
import { Link } from 'react-router';
import UserListItem from './UserListItem';

const UsersPage = () => {
  const { data: users } = useUsers();

  return (
    <>
      <header className={cn('flex', 'items-center', 'gap-2')}>
        <h1>유저 리스트</h1>
      </header>
      <main>
        <ul>
          {users.map((user) => (
            <Link to={ROUTE_CONSTANTS.users.getUserById(user.id)}>
              <UserListItem user={user} />
            </Link>
          ))}
        </ul>
      </main>
    </>
  );
};

export default UsersPage;
