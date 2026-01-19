import Login from "@/pages/auth/login";
import Otp from "@/pages/auth/otp";
import type { RouteObject } from "react-router-dom";

export const authRoute: RouteObject[] = [
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "otp/:session_id",
        element: <Otp />,
      },
    ],
  },
];
