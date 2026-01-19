import { authService } from '@/services/auth/auth.service';
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function useGetProfile() {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)
            const data = await authService.getProfile()
            console.log(data);
        } catch (error) {
            console.error(error);
            navigate('/auth/login')
        } finally {
            setLoading(false)
        }
    }, [])
    return { loading, getProfile }
}
