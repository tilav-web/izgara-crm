import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { rootRoute } from "./routes/root.route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter(rootRoute);
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
