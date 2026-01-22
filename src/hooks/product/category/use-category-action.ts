import { categoryService } from "@/services/product/category.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";

export default function useCategoryAction() {
    const nameRef = useRef<HTMLInputElement>(null)
    const [image, setImage] = useState<File | undefined>(undefined);
    const [id, setId] = useState<number | undefined>(undefined)
    const queryClient = useQueryClient();
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const mutation = useMutation({
        mutationFn: async ({ id, body }: { id?: number; body: FormData }) => {
            if (id) {
                return categoryService.update(id, body)
            }
            return categoryService.create(body)
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

    const handleOpenDialog = ({ id, bool }: { id?: number; bool: boolean }) => {
        setOpenDialog(bool)
        setId(id)
    }
    const handleImageChange = (file: File) => {
        setImage(file)
    }

    const handleSubmitCategory = (e: FormEvent) => {
        e.preventDefault();

        if (id && !nameRef.current?.value) {
            toast.error('Kategoriya nomi kiritilishi kerak!')
            return
        }
        if (id && !image) {
            toast.error('Kategoriya rasmi kiritilishi kerak!')
            return
        }

        if (id && !nameRef.current?.value && !image) {
            toast.error('Kategoriya malumotlarini yangilash uchun Nomini yoki rasmini kiriting!')
            return
        }

        const formData = new FormData();

        if (!id && nameRef.current?.value && image) {
            formData.append('name', nameRef.current?.value);
            formData.append('image', image);
        }

        if (id) {
            if (nameRef.current?.value) formData.append("name", nameRef.current?.value)
            if (image) formData.append("image", image)
        }

        mutation.mutate({
            id,
            body: formData
        });
    };


    return {
        handleSubmitCategory,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        openDialog,
        handleOpenDialog,
        nameRef,
        handleImageChange
    };
}
