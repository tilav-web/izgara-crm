import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateCategory from "@/hooks/product/category/use-create-category";
import { Upload, X, Tag, Image as ImageIcon } from "lucide-react";
import { useRef, useState } from "react";

export default function AddCategoryDialog() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const { createCategory, isPending } = useCreateCategory();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex flex-col items-center gap-2 group min-w-17.5 cursor-pointer">
          <div className="h-16 w-16 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
            <div className="flex items-center justify-center h-10 w-10 bg-gray-100 rounded-full group-hover:bg-orange-100 transition-colors duration-300">
              <span className="text-2xl font-bold text-gray-500 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-300">
                +
              </span>
            </div>
          </div>
          <span className="text-xs font-medium text-center text-gray-600 group-hover:text-orange-500 transition-colors duration-300">
            Yangi qo'shish
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white p-0 overflow-hidden rounded-xl shadow-xl">
        {/* Header with gradient */}
        <div className="bg-liner-to-r from-orange-50 to-red-50 px-6 py-5 border-b border-orange-100">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-liner-to-r from-orange-500 to-red-500 flex items-center justify-center shadow">
                <Tag className="h-5 w-5 text-black" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-gray-800">
                  Kategoriya qo'shish
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>
        </div>

        <form
          onSubmit={(e) =>
            createCategory(e, {
              name: nameRef.current?.value,
              image,
            })
          }
          className="p-6 space-y-5"
        >
          {/* Name input */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Kategoriya nomi
            </Label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                ref={nameRef}
                id="name"
                placeholder="Masalan: Telefonlar"
                className="pl-10 h-10 rounded-md border-gray-300 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Image upload - compact version */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Rasm
            </Label>

            {previewImage ? (
              <div className="relative group">
                <div className="h-32 rounded-lg overflow-hidden border">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setPreviewImage(null)}
                      className="bg-white text-gray-800 p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <label className="block">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 cursor-pointer hover:border-orange-400 transition-colors">
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Upload className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-700 font-medium">
                        Rasm yuklang
                      </p>
                      <p className="text-xs text-gray-500">Ixtiyoriy</p>
                    </div>
                  </div>
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImage(file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreviewImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 pt-4">
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="h-9 px-4 text-gray-600 hover:text-gray-800"
              >
                Bekor qilish
              </Button>
            </DialogTrigger>
            <Button
              type="submit"
              className="h-9 px-6 bg-orange-500 hover:bg-orange-600 text-white font-medium"
            >
              Saqlash
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
