import type { PropsWithChildren } from 'react';
import { cn } from '@/shared/lib/style';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <main
      className={cn('flex', 'flex-col', 'gap-3', 'w-screen', 'bg-background')}
    >
      {children}
    </main>
  );
};
export default MainLayout;
