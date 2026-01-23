import type { ICategory } from "@/interfaces/product/category.interface";
import type { IProduct } from "@/interfaces/product/product.interface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Edit, Trash2, ShoppingCart, Tag } from "lucide-react";

export default function ProductItem({
  product,
  category,
}: {
  product: IProduct;
  category: ICategory;
}) {
  // Aksiyalar uchun handlerlar (keyinchalik to'ldiriladi)
  const handleUpdate = () => {
    console.log("Update product:", product.id);
  };

  const handleDelete = () => {
    console.log("Delete product:", product.id);
  };

  // Narxni formatlash
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'currency',
      currency: 'UZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 group">
      {/* Sotuvdagi chegirma badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 font-bold">
            -{product.discount}%
          </Badge>
        </div>
      )}

      {/* Stock holati */}
      <div className="absolute top-3 right-3 z-10">
        {product.is_stock ? (
          <Badge className="bg-green-500 hover:bg-green-600 text-white px-3 py-1">
            Sotuvda
          </Badge>
        ) : (
          <Badge variant="destructive" className="px-3 py-1">
            Qolmagan
          </Badge>
        )}
      </div>

      {/* Mahsulot rasmi */}
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-slate-400 dark:text-slate-500">
              <ShoppingCart size={48} />
            </div>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Kategoriya nomi */}
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {category.name}
            </span>
          </div>
          
          {/* Aktivlik statusi */}
          <div className={`h-2 w-2 rounded-full ${product.is_active ? 'bg-green-500' : 'bg-slate-300'}`} />
        </div>
      </CardHeader>

      {/* Mahsulot ma'lumotlari */}
      <CardContent className="pb-3">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        {/* Narxlar */}
        <div className="space-y-2">
          {/* Asl narx */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Asl narx
            </span>
            <span className={`text-sm ${product.discount > 0 ? 'line-through text-slate-400 dark:text-slate-500' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
              {formatPrice(product.base_price)}
            </span>
          </div>

          {/* Chegirma narxi */}
          {product.discount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Chegirmadan keyin
              </span>
              <span className="font-bold text-lg text-green-600 dark:text-green-400">
                {formatPrice(product.final_price)}
              </span>
            </div>
          )}

          {/* QQS */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              QQS {product.vat}%
            </span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {formatPrice(product.final_price * product.vat / 100)}
            </span>
          </div>

          {/* Tejamkorlik */}
          {product.discount > 0 && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Siz tejaysiz
              </span>
              <span className="text-sm font-bold text-red-500">
                {formatPrice(product.base_price - product.final_price)}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      {/* Tahrirlash va o'chirish tugmalari */}
      <CardFooter className="pt-4 pb-4 border-t border-slate-100 dark:border-slate-700 flex justify-between gap-2">
        <Button
          variant="outline"
          className="flex-1 gap-2 border-slate-300 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
          onClick={handleUpdate}
        >
          <Edit className="h-4 w-4" />
          <span>Tahrirlash</span>
        </Button>
        
        <Button
          variant="outline"
          className="flex-1 gap-2 border-slate-300 dark:border-slate-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700 transition-all text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
          <span>O'chirish</span>
        </Button>
      </CardFooter>

      {/* ID ko'rsatish */}
      <div className="absolute bottom-3 right-3">
        <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
          ID: {product.id}
        </span>
      </div>
    </Card>
  );
}