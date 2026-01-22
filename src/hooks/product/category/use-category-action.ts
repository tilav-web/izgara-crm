import { categoryService } from "@/services/product/category.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type FormEvent } from "react";
import { toast } from "sonner";

export default function useCategoryAction() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({ id, body }: { id?: number; body: FormData | { name?: string } }) => {
            if (id) {
                return categoryService.update(id, body)
            }
            return categoryService.create(body as FormData)
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

    const handleSubmitCategory = (e: FormEvent, { id, name, image }: { id?: number; name?: string; image?: File }) => {
        e.preventDefault();

        if (!id) {
            if (!name || !image) {
                toast.error('Yaratish uchun nom va rasm kiritilishi shart!');
                return;
            }

            const formData = new FormData();
            formData.append('name', name);
            formData.append('image', image);

            mutation.mutate({ body: formData });
            return;
        }

        if (!name && !image) {
            toast.error('Yangilash uchun kamida bitta ma\'lumot kiriting (nom yoki rasm)!');
            return;
        }

        if (image) {
            const formData = new FormData();
            formData.append('image', image);
            if (name) formData.append('name', name);

            mutation.mutate({ id, body: formData });
        }
        else {
            const payload = { name };
            mutation.mutate({ id, body: payload });
        }

    };

    return {
        handleSubmitCategory,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
}
