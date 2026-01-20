import { Home, ShoppingBasket, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export const menu: {
    title: string;
    link: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}[] = [
        {
            title: 'Dashboard',
            link: '/',
            icon: Home
        },
        {
            title: 'Products',
            link: '/products',
            icon: ShoppingBasket
        }
    ]