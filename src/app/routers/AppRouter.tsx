import { createBrowserRouter, RouterProvider } from "react-router";
import { Homepage } from "@/pages";
import { ROUTE_CONSTANTS } from "@/shared/routes";

const router = createBrowserRouter([
  {
    path: ROUTE_CONSTANTS.home.root,
    element: <Homepage />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
