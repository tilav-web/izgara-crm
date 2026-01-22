import useFindAllCategory from "@/hooks/product/category/use-find-all-category";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils"; // Shadcn-ui utility (yoki oddiy classnames)
import CategoryFormDialog from "./category-form-dialog";
import CategoryItem from "./category-item";
import { useReducer } from "react";
import {
  CategoryFormInitialState,
  categoryFormReducer,
} from "@/reducers/products/category.reducer";

export default function CategoryList() {
  const { data: categories, isLoading, error } = useFindAllCategory();
  const [searchParams] = useSearchParams();
  const [categoryState, categoryDispatch] = useReducer(
    categoryFormReducer,
    CategoryFormInitialState,
  );

  // URL dan hozirgi kategoriya ID sini olamiz
  const activeCategoryId = searchParams.get("category");

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="w-full bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-hidden">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 min-w-20"
              >
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !categories || categories.length === 0) return null;

  return (
    <div className="flex items-center gap-4 overflow-x-auto p-4 flex-wrap">
      {/* "Barchasi" tugmasi (ixtiyoriy, agar kerak bo'lsa) */}
      <Link
        to="/products"
        className="flex flex-col items-center gap-2 group min-w-17.5 cursor-pointer"
      >
        <div
          className={cn(
            "h-16 w-16 rounded-full flex items-center justify-center border-2 transition-all duration-300",
            !activeCategoryId
              ? "border-orange-500 shadow-md scale-105 bg-orange-50"
              : "border-gray-200 hover:border-orange-300 bg-gray-50",
          )}
        >
          <span
            className={cn(
              "text-2xl font-bold",
              !activeCategoryId
                ? "text-orange-600"
                : "text-gray-400 group-hover:text-orange-500",
            )}
          >
            ∞
          </span>
        </div>
        <span
          className={cn(
            "text-xs font-medium text-center transition-colors",
            !activeCategoryId ? "text-orange-600 font-bold" : "text-gray-600",
          )}
        >
          Barchasi
        </span>
      </Link>

      {/* Kategoriyalar */}
      {categories.map((category) => {
        return (
          <CategoryItem
            key={category.id}
            category={category}
            dispatch={categoryDispatch}
          />
        );
      })}
      <CategoryFormDialog state={categoryState} dispatch={categoryDispatch} />
    </div>
  );
}
