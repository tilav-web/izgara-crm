import type { IProduct } from "@/interfaces/product/product.interface";
import { BaseService } from "../base.service";
import { API_ENDPOINTS } from "@/shared/constants";

class ProductService extends BaseService {
    async findAll() {
        return this.GET<IProduct[]>(API_ENDPOINTS.PRODUCTS.findAll)
    }
}

export const productService = new ProductService()