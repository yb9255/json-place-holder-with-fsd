import { createBrowserRouter, RouterProvider } from 'react-router';
import { ROUTE_CONSTANTS } from '@/shared/routes';

import { HomePage } from '@/pages/home';
import { PostsPage } from '@/pages/posts';
import { PostPage } from '@/pages/post';
import { UsersPage } from '@/pages/users';
import { UserPage } from '@/pages/user';

const router = createBrowserRouter([
  {
    path: ROUTE_CONSTANTS.home.root,
    element: <HomePage />,
    children: [
      {
        path: ROUTE_CONSTANTS.posts.root,
        children: [
          {
            index: true,
            element: <PostsPage />,
          },
          {
            path: ':postId',
            element: <PostPage />,
          },
        ],
      },
      {
        path: ROUTE_CONSTANTS.users.root,
        children: [
          {
            index: true,
            element: <UsersPage />,
          },
          {
            path: ':userId',
            element: <UserPage />,
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
