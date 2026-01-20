import { authService } from '@/services/auth/auth.service';
import { useUserStore } from '@/stores/user.store';
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function useGetProfile() {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const { setUser } = useUserStore()

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)
            const data = await authService.getProfile()
            setUser(data)
        } catch (error) {
            console.error(error);
            navigate('/auth/login')
        } finally {
            setLoading(false)
        }
    }, [])
    return { loading, getProfile }
}
