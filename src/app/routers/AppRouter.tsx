import { createBrowserRouter, RouterProvider } from 'react-router';
import { ROUTE_CONSTANTS } from '@/shared/routes';

import { HomePage, PostsPage, PostPage } from '@/pages';

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
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
