import { Header } from "@/components/common/header/header";
import Loading from "@/components/common/loading";
import Sidebar from "@/components/common/sidebar/sidebar";
import useGetProfile from "@/hooks/auth/use-get-profile";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSidebar } from "@/hooks/sidebar/use-sidebar";
import { cn } from "@/lib/utils";

export default function SubLayout() {
  const { loading, getProfile } = useGetProfile();
  const { isOpen } = useSidebar();

  useEffect(() => {
    (async () => {
      await getProfile();
    })();
  }, [getProfile]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-screen bg-background">
      <Sidebar />
      <div
        className={cn(
          "flex flex-col transition-all duration-300",
          isOpen ? "pl-64" : "pl-20"
        )}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}