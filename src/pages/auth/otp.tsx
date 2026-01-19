import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { mainImage } from "@/shared/images";
import { Spinner } from "@/components/ui/spinner"; // Assuming spinner might be useful for loading state
import useOtp from "@/hooks/auth/use-otp";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function Otp() {
  const [code, setCode] = useState<string>("4444");
  const { otpConfirmation, loading } = useOtp();
  const { session_id } = useParams();
  const { t } = useTranslation();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full h-full max-w-[90vw] max-h-[90vh] flex overflow-hidden rounded-lg shadow-lg bg-white">
        {/* Left side - Image (Desktop only) */}
        <div className="hidden lg:flex lg:w-1/2">
          <img
            src={mainImage}
            alt="OTP image"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right side - OTP form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md">
            <Card className="border-0 shadow-none bg-transparent lg:bg-white">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-xl lg:text-2xl font-bold text-gray-800">
                  {t("pages.auth.otp.title")}
                </CardTitle>
                <CardDescription className="text-gray-500">
                  {t("pages.auth.otp.description")}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form
                  className="space-y-6 flex flex-col items-center" // Centered for InputOTP
                  onSubmit={(e) => otpConfirmation(e, { code, session_id })}
                >
                  <div className="space-y-2">
                    <InputOTP
                      maxLength={4}
                      value={code}
                      onChange={(value) => setCode(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                    <p className="text-xs text-gray-400 px-1 text-center">
                      {t("pages.auth.otp.expire_in")}
                    </p>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Spinner />}
                    {t("pages.auth.otp.submit_button")}
                  </Button>

                  {/* Resend OTP or other options */}
                  <div className="text-center text-sm text-gray-500">
                    {t("pages.auth.otp.resend_text")}{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:underline font-medium"
                      onClick={(e) => {
                        e.preventDefault();
                        // User will implement resend OTP logic here
                        console.log("Resend OTP clicked");
                      }}
                    >
                      {t("pages.auth.otp.resend_button")}
                    </a>
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
