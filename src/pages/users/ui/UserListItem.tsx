import { User } from "@/entities/user/model";
import { cn } from "@/shared/lib/style";
import { ROUTE_CONSTANTS } from "@/shared/routes";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";
import { Link } from "react-router";

const UserListItem = ({ user }: { user: User }) => {
  return (
    <li>
      <Link
        to={ROUTE_CONSTANTS.users.getUserById(user.id)}
        className={cn("flex", "items-center", "gap-2")}
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span>{user.name}</span>
      </Link>
    </li>
  );
};

export default UserListItem;
