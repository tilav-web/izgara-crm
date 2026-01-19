import { API_ENDPOINTS, baseURL } from "@/shared/constants"
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios"

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _isRetry?: boolean
}


const $api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})

$api.interceptors.request.use(config => {
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type']
    }
    const token = localStorage.getItem('access_token')
    if (token && (config.url !== API_ENDPOINTS.AUTH.login && config.url !== API_ENDPOINTS.AUTH.otp)) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

$api.interceptors.response.use((res) => {
    return res.data
}, async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig
    if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true
        try {
            const refresh = localStorage.getItem('refresh_token')
            if (!refresh) {
                throw error
            }
            const res = await axios.post(`${baseURL}${API_ENDPOINTS.AUTH.refresh_token}`, {
                refresh
            })

            if (res.data.refresh) localStorage.setItem('refresh_token', res.data.refresh)
            if (res.data.access) localStorage.setItem('access_token', res.data.access)
            originalRequest.headers.Authorization = `Bearer ${res.data.access}`

            return $api(originalRequest)
        } catch (error) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            window.location.href = '/auth/login'
            return Promise.reject(error)
        }
    }
    return Promise.reject(error)
})

export default $api