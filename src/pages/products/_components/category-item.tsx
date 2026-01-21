import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { ICategory } from "@/interfaces/product/category.interface";
import { cn } from "@/lib/utils";
import { baseURL } from "@/shared/constants";
import { Edit, Trash } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

export default function CategoryItem({ category }: { category: ICategory }) {
  const [searchParams] = useSearchParams();
  const activeCategoryId = searchParams.get("category");
  const isActive = activeCategoryId === String(category.id);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link
          key={category.id}
          to={`/products?category=${category.id}`}
          className="flex flex-col items-center gap-2 group min-w-17.5 cursor-pointer"
        >
          <div className="relative">
            {/* Rasm konteyneri */}
            <div
              className={cn(
                "h-16 w-16 rounded-full overflow-hidden border-2 transition-all duration-300 p-0.5",
                isActive
                  ? "border-orange-500 shadow-lg scale-105 ring-2 ring-orange-100" // Aktiv holat
                  : "border-transparent bg-gray-100 group-hover:border-orange-300", // Oddiy holat
              )}
            >
              <div className="h-full w-full rounded-full overflow-hidden bg-white">
                {category.image ? (
                  <img
                    src={`${baseURL}${category.image}`}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-50 text-gray-400 font-bold text-xl">
                    {category.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Matn */}
          <span
            className={cn(
              "text-xs font-medium text-center transition-colors max-w-20 truncate",
              isActive
                ? "text-orange-600 font-bold"
                : "text-gray-600 group-hover:text-orange-500",
            )}
          >
            {category.name}
          </span>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="flex items-center justify-between cursor-pointer">
          Edit <Edit />
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center justify-between cursor-pointer">
          Delete <Trash />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
