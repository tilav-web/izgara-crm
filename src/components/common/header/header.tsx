import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { baseURL } from "@/shared/constants";
import { useUserStore } from "@/stores/user.store";

export const Header = () => {
  const { user } = useUserStore();

  return (
    <header className="h-16 border-b flex items-center px-2 justify-between">
      <div></div>
      <div className="border flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer shadow">
        <Avatar>
          <AvatarImage
            src={`${baseURL}${user?.image}`}
            alt={user?.first_name}
          />
          <AvatarFallback>
            {user?.first_name?.slice(0, 1).toUpperCase()}
            {user?.last_name?.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="-space-y-1">
          {user?.first_name ? (
            <p className="text-sm font-bold capitalize">{user?.first_name}</p>
          ) : (
            <Skeleton className="h-4 w-24" />
          )}
          {user?.phone ? (
            <span className="text-sm">{user?.phone}</span>
          ) : (
            <Skeleton className="h-3 w-32" />
          )}
        </div>
      </div>
    </header>
  );
};
