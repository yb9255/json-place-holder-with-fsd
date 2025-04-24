import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { Link, Outlet } from "react-router";
import { ROUTE_CONSTANTS } from "@/shared/routes";

const Homepage = () => {
  return (
    <main
      className={cn("flex", "flex-col", "gap-3", "w-screen", "bg-background")}
    >
      <nav
        className={cn(
          "flex",
          "gap-3",
          "shadow-sm",
          "flex-1",
          "sticky",
          "top-0",
          "items-center",
          "bg-white"
        )}
      >
        <Button asChild variant="link">
          <Link to={ROUTE_CONSTANTS.home.root}>Home</Link>
        </Button>
        <Button asChild variant="link">
          <Link to={ROUTE_CONSTANTS.posts.root}>Posts</Link>
        </Button>
      </nav>

      <Outlet />
    </main>
  );
};

export default Homepage;
