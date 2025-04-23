import { createBrowserRouter, RouterProvider } from "react-router";
import { Homepage } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
