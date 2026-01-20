import { API_ENDPOINTS } from "@/shared/constants";
import { BaseService } from "../base.service";

class CategoryService extends BaseService {
    async getAllCategory() {
        return this.GET(API_ENDPOINTS.CATEGORY.findALl)
    }
}

export const categoryService = new CategoryService()