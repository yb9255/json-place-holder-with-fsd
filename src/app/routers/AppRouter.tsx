import { createBrowserRouter, RouterProvider } from 'react-router';
import { ROUTE_CONSTANTS } from '@/shared/routes';

import { HomePage, PostsPage, PostPage, UsersPage, UserPage } from '@/pages';

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
