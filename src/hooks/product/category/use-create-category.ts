import { categoryService } from "@/services/product/category.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FormEvent } from "react";
import { toast } from "sonner";

export default function useCreateCategory() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            return categoryService.create(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Kategoriya yaratildi!');
        },
        onError: (error) => {
            toast.error('Kategoriya yaratishda xatolik!');
            console.error(error);
        }
    });

    const createCategory = (e: FormEvent, { name, image }: { name?: string; image?: File }) => {
        e.preventDefault();
        if (!name) {
            toast.error('Kategoriya nomi kiritilishi kerak!')
            return
        }
        if (!image) {
            toast.error('Kategoriya rasmi kiritilishi kerak!')
            return
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);

        mutation.mutate(formData);
    };

    return {
        createCategory,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error
    };
}
