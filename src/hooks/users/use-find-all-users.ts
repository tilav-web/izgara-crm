import { userService } from "@/services/user/user.service";
import { useQuery } from "@tanstack/react-query";

export default function useFindAllUsers() {
    const { data: users, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => userService.findAll(),
        staleTime: 1000 * 60 * 5
    })

    return { users, isLoading }
}
