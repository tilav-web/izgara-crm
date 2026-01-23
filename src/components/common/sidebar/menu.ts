import { Home, ShoppingBasket, Users2, type LucideProps } from "lucide-react";
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
        },
        {
            title: 'Users',
            link: '/users',
            icon: Users2
        }
    ]