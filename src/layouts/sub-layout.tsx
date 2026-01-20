import { Header } from "@/components/common/header/header";
import Loading from "@/components/common/loading";
import Sidebar from "@/components/common/sidebar/sidebar";
import useGetProfile from "@/hooks/auth/use-get-profile";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function SubLayout() {
  const { loading, getProfile } = useGetProfile();

  useEffect(() => {
    (async () => {
      await getProfile();
    })();
  }, [getProfile]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-screen h-screen bg-background flex items-stretch overflow-hidden">
      <Sidebar />
      <div className="flex-1 h-full">
        <Header />
        <main className="h-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
