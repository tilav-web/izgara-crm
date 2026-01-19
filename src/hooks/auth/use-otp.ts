import { authService } from "@/services/auth/auth.service";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useOtp() {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const { t } = useTranslation();

    const otpConfirmation = async (e: FormEvent, { session_id, code }: { session_id?: string; code?: string }) => {
        e.preventDefault()
        try {
            if (!session_id) {
                toast.error(t("notification.errors.hooks.auth.useOtp.session_not_found"))
                return
            }
            if (!code) {
                toast.error(t("notification.errors.hooks.auth.useOtp.code_not_found"))
                return
            }

            setLoading(true)
            const data = await authService.otpConfirmation({ session_id, code })
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('refresh_token', data.refresh_token)
            navigate('/')
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }
    return { otpConfirmation, loading }
}
