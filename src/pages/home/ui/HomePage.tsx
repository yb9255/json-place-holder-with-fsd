import { Suspense } from 'react';
import { MainLayout, GlobalNavBar } from '@/widgets/layout/ui';
import { useLocation, Outlet } from 'react-router';
import { Spinner } from '@/shared/ui';

const HomePage = () => {
  const location = useLocation();

  return (
    <MainLayout>
      <GlobalNavBar />
      <Suspense fallback={<Spinner />} key={location.key}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export default HomePage;
