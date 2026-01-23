import useFindAllCategory from "@/hooks/product/category/use-find-all-category";
import useFindAllProducts from "@/hooks/product/use-find-all-products";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  RefreshCw, 
  Package, 
  Filter,
  Grid3X3,
  List,
  Trash2,
  Edit
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import type { ICategory } from "@/interfaces/product/category.interface";
import type { IProduct } from "@/interfaces/product/product.interface";
import ProductItem from "./product-item";

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

// List view uchun loading skeleton
const ProductListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center gap-4 p-4 border rounded-lg animate-pulse">
          <Skeleton className="w-24 h-24 rounded-lg" />
          <div className="flex-1 space-y-3">
            <div className="flex justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-8 w-24" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Category skeleton
const CategoryFilterSkeleton = () => {
  return (
    <div className="space-y-4 p-4 border rounded-lg animate-pulse">
      <Skeleton className="h-6 w-32" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ProductList() {
  const { products, isLoading, error, refetch } = useFindAllProducts();
  const { categoryMap, isLoading: categoriesLoading } = useFindAllCategory();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters skeleton */}
          <div className="lg:col-span-1">
            <CategoryFilterSkeleton />
          </div>

          {/* Products skeleton */}
          <div className="lg:col-span-3">
            {viewMode === 'grid' ? (
              <ProductGridSkeleton />
            ) : (
              <ProductListSkeleton />
            )}
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
            Mahsulotlarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.
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
            Hozircha mahsulotlar mavjud emas. Yangi mahsulot qo'shing yoki filtr parametrlarini o'zgartiring.
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
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  // Kategoriyalar ro'yxati
  const categories = Object.values(categoryMap || {});

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Mahsulotlar
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Jami {filteredProducts.length} ta mahsulot topildi
          </p>
        </div>

        {/* View controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => refetch()}
          >
            <RefreshCw className="h-4 w-4" />
            Yangilash
          </Button>
          
          <div className="flex items-center border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none border-0"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none border-0"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-500" />
                <CardTitle className="text-lg">Filtrlar</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {/* Kategoriya filtrlari */}
              <div className="space-y-4">
                <h3 className="font-medium text-slate-700 dark:text-slate-300">
                  Kategoriyalar
                </h3>
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === null ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(null)}
                  >
                    <span className="truncate">Barcha kategoriyalar</span>
                    <Badge variant="secondary" className="ml-auto">
                      {products.length}
                    </Badge>
                  </Button>
                  
                  {categories.map((category: ICategory) => {
                    const count = products.filter(p => p.category === category.id).length;
                    return (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? 'default' : 'ghost'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <span className="truncate">{category.name}</span>
                        <Badge variant="secondary" className="ml-auto">
                          {count}
                        </Badge>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Statistikalar */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="font-medium text-slate-700 dark:text-slate-300">
                  Statistikalar
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Faol mahsulotlar
                    </span>
                    <Badge variant="outline">
                      {products.filter(p => p.is_active).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Sotuvda borlar
                    </span>
                    <Badge variant="outline">
                      {products.filter(p => p.is_stock).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Chegirmadagilar
                    </span>
                    <Badge variant="outline">
                      {products.filter(p => p.discount > 0).length}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <Alert>
              <Package className="h-4 w-4" />
              <AlertTitle>Mahsulot topilmadi</AlertTitle>
              <AlertDescription>
                Tanlangan kategoriyada mahsulotlar mavjud emas.
              </AlertDescription>
            </Alert>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product: IProduct) => {
                const category = categoryMap?.[product.category];
                return category ? (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      {/* Rasmi */}
                      <div className="sm:w-48 h-48 sm:h-auto bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package className="h-16 w-16 text-slate-400" />
                        )}
                      </div>
                      
                      {/* Ma'lumotlar */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">
                                {category.name}
                              </Badge>
                              {product.is_stock ? (
                                <Badge className="bg-green-500">Sotuvda</Badge>
                              ) : (
                                <Badge variant="destructive">Qolmagan</Badge>
                              )}
                              {product.discount > 0 && (
                                <Badge className="bg-red-500">
                                  -{product.discount}%
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            {product.discount > 0 && (
                              <div className="text-sm line-through text-slate-400 mb-1">
                                {new Intl.NumberFormat('uz-UZ', {
                                  style: 'currency',
                                  currency: 'UZS'
                                }).format(product.base_price)}
                              </div>
                            )}
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                              {new Intl.NumberFormat('uz-UZ', {
                                style: 'currency',
                                currency: 'UZS'
                              }).format(product.final_price)}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              ID: {product.id} • QQS: {product.vat}%
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              Status: {product.is_active ? 'Faol' : 'Nofaol'}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                              <Edit className="h-4 w-4" />
                              Tahrirlash
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              O'chirish
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}