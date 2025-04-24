import { createBrowserRouter, RouterProvider } from "react-router";
import { Homepage, PostsPage } from "@/pages";
import { ROUTE_CONSTANTS } from "@/shared/routes";
import { Suspense } from "react";
import { Spinner } from "@/shared/ui";
const router = createBrowserRouter([
  {
    path: ROUTE_CONSTANTS.home.root,
    element: <Homepage />,
    children: [
      {
        path: ROUTE_CONSTANTS.posts.root,
        element: (
          <Suspense fallback={<Spinner />}>
            <PostsPage />
          </Suspense>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
