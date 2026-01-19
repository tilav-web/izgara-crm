import { useLngStore } from "@/stores/lng.store";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  const { lng } = useLngStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    (async () => {
      i18n.changeLanguage(lng);
    })();
  }, [lng, i18n]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
