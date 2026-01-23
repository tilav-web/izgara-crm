
// BASE API URL
export const baseURL = 'https://atsrestaurant.pythonanywhere.com'

// API ENDPOINTS
export const API_ENDPOINTS = {
    AUTH: {
        login: "/accounts/login/",
        otp: "/accounts/verification/",
        profile: "/accounts/get_my_profile/",
        refresh_token: "/accounts/refresh-token/"
    },
    CATEGORY: {
        findALl: "/products/get_all_category/",
        create: "/products/add_category/",
        update: (id: number) => `/products/update_category/${id}/`,
        delete: (id: number) => `/products/delete_category/${id}/`
    },
    PRODUCTS: {
        findAll: "/products/get_all_product/"
    }
}

