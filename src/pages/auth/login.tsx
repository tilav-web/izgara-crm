import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mainImage } from "@/shared/images";
import usePolishPhoneNumber from "@/hooks/use-polish-phone-number";
import { useTranslation } from "react-i18next";
import useLogin from "@/hooks/auth/use-login";
import { Spinner } from "@/components/ui/spinner";

export default function Login() {
  const { phone, polishInput, polishPhoneNumber } = usePolishPhoneNumber();
  const { t } = useTranslation();
  const { login, loading } = useLogin();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full h-full max-w-[90vw] max-h-[90vh] flex overflow-hidden rounded-lg shadow-lg bg-white">
        {/* Left side - Image (Desktop only) */}
        <div className="hidden lg:flex lg:w-1/2">
          <img
            src={mainImage}
            alt="izgara image"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md">
            <Card className="border-0 shadow-none bg-transparent lg:bg-white">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-xl lg:text-2xl font-bold text-gray-800">
                  {t("pages.auth.login.title")}
                </CardTitle>
                <CardDescription className="text-gray-500">
                  {t("pages.auth.login.description")}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form
                  className="space-y-6 flex flex-col"
                  onSubmit={(e) => login(e, { phone: polishPhoneNumber })}
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700 block"
                    >
                      {t("pages.auth.login.phone_label")}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <span className="text-gray-700 font-medium">+998</span>
                        <div className="h-5 w-px bg-gray-300"></div>
                      </div>
                      <Input
                        id="phone"
                        type="text"
                        value={phone}
                        onChange={(e) => polishInput(e.target.value)}
                        placeholder="90 123 45 67"
                        className="pl-16 h-14 text-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl"
                      />
                    </div>
                    <p className="text-xs text-gray-400 px-1">
                      {t("pages.auth.login.phone_info")}
                    </p>
                  </div>

                  <Button type="submit" className="" disabled={loading}>
                    {loading ?? <Spinner />}
                    {t("pages.auth.login.submit_button")}
                  </Button>

                  {/* Terms - Mobile optimized */}
                  <div className="text-center text-xs md:text-sm text-gray-500 pt-6 border-t border-gray-100">
                    <p className="leading-relaxed">
                      "OTP kodni olish" tugmasini bosish orqali siz{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:underline font-medium inline"
                      >
                        Foydalanish shartlari
                      </a>{" "}
                      va{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:underline font-medium inline"
                      >
                        Maxfiylik siyosati
                      </a>{" "}
                      bilan rozilik bildirasiz
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
