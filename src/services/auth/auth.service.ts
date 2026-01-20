import type { IUser } from "@/interfaces/user.interface";
import { API_ENDPOINTS } from "@/shared/constants";
import { BaseService } from "../base.service";

class AuthService extends BaseService {
  async login(phone: string) {
    return this.POST<{
      session_id: string,
      code: string,
      message: string
    }>(API_ENDPOINTS.AUTH.login, { phone })
  }

  async otpConfirmation({ session_id, code }: { session_id: string; code: string }) {
    return this.POST<{
      access_token: string;
      refresh_token: string;
    }>(API_ENDPOINTS.AUTH.otp, { session_id, code })
  }
  
  async getProfile() {
    return this.GET<IUser>(API_ENDPOINTS.AUTH.profile)
  }
}

export const authService = new AuthService();