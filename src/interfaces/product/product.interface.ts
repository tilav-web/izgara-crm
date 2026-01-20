export interface IProduct {
    id: number
    category: number
    name: string
    description: string
    image: string | null
    vat: number
    base_price: number
    final_price: number
    discount: number
    is_stock: boolean
    is_active: boolean
}