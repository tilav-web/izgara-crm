import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { rootRoute } from "./routes/root.route";

const router = createBrowserRouter(rootRoute);

export default function App() {
  return <RouterProvider router={router} />;
}
