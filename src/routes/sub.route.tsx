import SubLayout from "@/layouts/sub-layout";
import Dashboard from "@/pages/dashboard/dashboard";
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
    ],
  },
];
