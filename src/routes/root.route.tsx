import { type RouteObject } from "react-router-dom";
import RootLayout from "../layouts/root-layout";
import { authRoute } from "./auth.route";
import { subRoute } from "./sub.route";

export const rootRoute: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [...authRoute, ...subRoute],
  },
];
