import useFindAllCategory from "@/hooks/product/category/use-find-all-category";
import useFindAllProducts from "@/hooks/product/use-find-all-products";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RefreshCw, Package } from "lucide-react";
import type { IProduct } from "@/interfaces/product/product.interface";
import ProductItem from "./product-item";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Grid view uchun loading skeleton
const ProductGridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden animate-pulse">
          <Skeleton className="h-48 w-full rounded-none" />
          <CardHeader className="space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-full" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="space-y-2 pt-4">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          </CardContent>
          <CardContent className="pt-4 border-t">
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 flex-1" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default function ProductList() {
  const { products, isLoading, error, refetch } = useFindAllProducts();
  const { categoryMap, isLoading: categoriesLoading } = useFindAllCategory();
  const [searchParams] = useSearchParams();
  const activeCategoryId = searchParams.get("category");

  // Yuklanish holatida
  if (isLoading || categoriesLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        {/* Header skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1">
          {/* Products skeleton */}
          <div className="col-span-1">
            <ProductGridSkeleton />
          </div>
        </div>
      </div>
    );
  }

  // Xatolik holati
  if (error) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Xatolik yuz berdi</AlertTitle>
          <AlertDescription>
            Mahsulotlarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib
            ko'ring.
          </AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <Button onClick={() => refetch()} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Qayta yuklash
          </Button>
        </div>
      </div>
    );
  }

  // Hech narsa topilmagan holati
  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
            <Package className="h-12 w-12 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Mahsulotlar topilmadi
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md">
            Hozircha mahsulotlar mavjud emas. Yangi mahsulot qo'shing yoki filtr
            parametrlarini o'zgartiring.
          </p>
          <Button className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Yangilash
          </Button>
        </div>
      </div>
    );
  }

  // Filtrlangan mahsulotlar
  const filteredProducts = activeCategoryId
    ? products.filter(
        (product) => product.category === Number(activeCategoryId),
      )
    : products;

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Content */}
      <div className="grid grid-cols-1">
        {/* Products */}
        <div className="col-span-1">
          {filteredProducts.length === 0 ? (
            <Alert>
              <Package className="h-4 w-4" />
              <AlertTitle>Mahsulot topilmadi</AlertTitle>
              <AlertDescription>
                Tanlangan kategoriyada mahsulotlar mavjud emas.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-24">
              {filteredProducts.map((product: IProduct) => {
                const category = categoryMap?.[product.category];
                return category ? (
                  <ProductItem
                    key={product.id}
                    product={product}
                    category={category}
                  />
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
