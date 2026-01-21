import { categoryService } from "@/services/product/category.service";
import { useQuery } from "@tanstack/react-query";

export default function useFindAllCategory() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => categoryService.findAll(),
        staleTime: 1000 * 60 * 5
    })
}
