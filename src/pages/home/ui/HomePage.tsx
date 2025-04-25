import { cn } from '@/shared/lib';
import { Button, Spinner } from '@/shared/ui';
import { Link, Outlet, useLocation } from 'react-router';
import { ROUTE_CONSTANTS } from '@/shared/routes';
import { Suspense } from 'react';

const Homepage = () => {
  const location = useLocation();

  return (
    <main
      className={cn('flex', 'flex-col', 'gap-3', 'w-screen', 'bg-background')}
    >
      <nav
        className={cn(
          'flex',
          'gap-3',
          'shadow-sm',
          'flex-1',
          'sticky',
          'top-0',
          'items-center',
          'bg-white',
        )}
      >
        <Button asChild variant="link">
          <Link to={ROUTE_CONSTANTS.home.root}>Home</Link>
        </Button>
        <Button asChild variant="link">
          <Link to={ROUTE_CONSTANTS.posts.root}>Posts</Link>
        </Button>
        <Button asChild variant="link">
          <Link to={ROUTE_CONSTANTS.users.root}>Users</Link>
        </Button>
      </nav>

      <Suspense fallback={<Spinner />} key={location.key}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default Homepage;
