import { categoryService } from "@/services/product/category.service";
import { useQuery } from "@tanstack/react-query";

export default function useFindAllCategory() {
    return useQuery({
        queryKey: ['category'],
        queryFn: categoryService.getAllCategory,
        staleTime: 1000 * 60 * 5
    })
}
