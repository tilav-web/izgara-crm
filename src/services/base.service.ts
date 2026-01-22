import $api from "@/lib/api-instance";
import type { AxiosInstance } from "axios";

export class BaseService {
    protected api: AxiosInstance

    constructor() {
        this.api = $api
    }

    //GET
    protected async GET<T>(url: string, params?: any): Promise<T> {
        return this.api.get(url, params) as Promise<T>
    }

    //POST
    protected async POST<T>(url: string, body: any, config?: any): Promise<T> {
        return this.api.post(url, body, config) as Promise<T>
    }

    //PUT
    protected async PATCH<T>(url: string, body: any): Promise<T> {
        return this.api.patch(url, body) as Promise<T>
    }

    protected async DELETE<T>(url: string): Promise<T> {
        return this.api.delete(url) as Promise<T>
    }
}