import { productService } from "@/services/product/product.service";
import { useQuery } from "@tanstack/react-query";

export default function useFindAllProducts() {
    const { data: products, isLoading, error, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: () => productService.findAll(),
        staleTime: 1000 * 60 * 5,
    })

    return { products, isLoading, error, refetch }
}
