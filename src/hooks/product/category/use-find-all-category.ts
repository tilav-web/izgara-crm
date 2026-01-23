import type { ICategory } from "@/interfaces/product/category.interface";
import { categoryService } from "@/services/product/category.service";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export default function useFindAllCategory() {
    
    const selectFn = useCallback((data: ICategory[]) => {
        const map = data.reduce((acc, category) => {
            acc[category.id] = category;
            return acc;
        }, {} as Record<number, ICategory>);

        return {
            categories: data,
            categoryMap: map
        };
    }, []);

    const { data, isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => categoryService.findAll(),
        staleTime: 1000 * 60 * 5,
        select: selectFn
    });

    return { 
        categories: data?.categories,
        categoryMap: data?.categoryMap,
        isLoading, 
        error 
    };
}