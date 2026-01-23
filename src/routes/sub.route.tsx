import SubLayout from "@/layouts/sub-layout";
import Dashboard from "@/pages/dashboard/dashboard";
import Products from "@/pages/products/products";
import Users from "@/pages/users/users";
import type { RouteObject } from "react-router-dom";

export const subRoute: RouteObject[] = [
  {
    path: "/",
    element: <SubLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
];
