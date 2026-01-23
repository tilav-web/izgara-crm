import type { IUser } from "@/interfaces/user.interface";
import { BaseService } from "../base.service";
import { API_ENDPOINTS } from "@/shared/constants";

class UserService extends BaseService {
    async findAll() {
        return this.GET<IUser[]>(API_ENDPOINTS.USERS.findAll)
    }
}

export const userService = new UserService()