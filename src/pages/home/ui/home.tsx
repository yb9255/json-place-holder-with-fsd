import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";

const Homepage = () => {
  return (
    <main
      className={cn(
        "flex",
        "h-screen",
        "w-screen",
        "items-center",
        "justify-center",
        "bg-background"
      )}
    >
      <h1 className={cn("font-bold")}>Homepage</h1>
      <Button variant="outline">Click me</Button>
    </main>
  );
};

export default Homepage;
