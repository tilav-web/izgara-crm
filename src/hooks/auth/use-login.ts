import { authService } from "@/services/auth/auth.service";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useLogin() {
    const [loading, setLoading] = useState<boolean>(false)
    const { t } = useTranslation()
    const navigate = useNavigate()

    const login = async (e: FormEvent, { phone }: { phone: string }) => {
        e.preventDefault()
        try {
            if (!phone.trim().length) {
                toast.error(t('notification.errors.hooks.useLogin.phone_empty'))
                return
            }
            if (phone.trim().length !== 13) {
                toast.error(t('notification.errors.hooks.useLogin.phone_failed'))
                return
            }

            setLoading(true)
            const data = await authService.login(phone)
            navigate(`/auth/otp/${data.session_id}`)
            return
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    return { loading, login }
}
