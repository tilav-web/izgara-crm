import $api from "@/lib/api-instance";
import { API_ENDPOINTS } from "@/shared/constants";

class AuthService {
    async login(phone: string) {
        const data: {
            session_id: string,
            code: string,
            message: string
        } = await $api.post(API_ENDPOINTS.AUTH.login, { phone })
        return data
    }
    async otpConfirmation({ session_id, code }: { session_id: string; code: string }) {
        const data: {
            access_token: string;
            refresh_token: string;
        } = await $api.post(API_ENDPOINTS.AUTH.otp, {
            session_id,
            code
        })
        return data
    }
    async getProfile() {
        const data = await $api.get(API_ENDPOINTS.AUTH.profile)
        return data
    }
}

export const authService = new AuthService();