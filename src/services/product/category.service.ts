import { API_ENDPOINTS } from "@/shared/constants";
import { BaseService } from "../base.service";
import type { ICategory } from "@/interfaces/product/category.interface";

class CategoryService extends BaseService {
  async findAll() {
    return this.GET<ICategory[]>(API_ENDPOINTS.CATEGORY.findALl)
  }

  async create(body: FormData) {
    return this.POST<ICategory>(API_ENDPOINTS.CATEGORY.create, body)
  }
}

export const categoryService = new CategoryService()