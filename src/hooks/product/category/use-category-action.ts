import { categoryService } from "@/services/product/category.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type FormEvent } from "react";
import { toast } from "sonner";

type MutationBody = FormData | { name?: string };

export default function useCategoryAction() {
    const queryClient = useQueryClient();

    const saveMutation = useMutation({
        mutationFn: async ({ id, body }: { id?: number; body: MutationBody }) => {
            if (id) {
                return categoryService.update(id, body);
            }
            return categoryService.create(body as FormData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Muvaffaqiyatli saqlandi!');
        },
        onError: (error) => {
            toast.error('Saqlashda xatolik bo\'ldi!');
            console.error(error);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            return categoryService.delete(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Kategoriya o\'chirildi!');
        },
        onError: (error) => {
            toast.error('O\'chirishda xatolik bo\'ldi!');
            console.error(error);
        }
    });

    const handleSubmitCategory = (e: FormEvent, { id, name, image }: { id?: number; name?: string; image?: File }) => {
        e.preventDefault();

        // Validation...
        if (!id && (!name || !image)) {
            toast.error('Yaratish uchun nom va rasm shart!');
            return;
        }
        if (id && !name && !image) {
            toast.error('O\'zgarish yo\'q!');
            return;
        }

        // Body tayyorlash
        let body: MutationBody;

        if (image) {
            const formData = new FormData();
            formData.append('image', image);
            if (name) formData.append('name', name);
            body = formData;
        } else {
            body = { name };
        }

        // Save mutationni chaqirish
        saveMutation.mutate({ id, body });
    };

    const handleDeleteCategory = (id?: number) => {
        if (!id) {
            toast.error('Kategoriya topilmadi!')
            return
        }
        deleteMutation.mutate(id);
    }

    return {
        handleSubmitCategory,
        handleDeleteCategory,
        isSavePending: saveMutation.isPending,
        isDeletePending: deleteMutation.isPending,
    };
}