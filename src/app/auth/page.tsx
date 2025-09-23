"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Star, Diamond, Sparkles, Eye, EyeOff, Loader2 } from "lucide-react";
import * as yup from "yup";
import api from "@/utils/axios";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "At least 6 characters").required("Password is required"),
});

const registerSchema = yup.object().shape({
  name: yup.string().min(2, "Name is too short").required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "At least 6 characters").required("Password is required"),
});

interface FormData {
  name?: string;
  email: string;
  password: string;
}

const AuthPage: React.FC = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  const onSubmit = async (values: FormData): Promise<void> => {
    setIsLoading(true);
    try {
      const endpoint: string = isRegister ? "/auth/register" : "/auth/login";
      const payload = isRegister
        ? { name: values.name!, email: values.email, password: values.password }
        : { email: values.email, password: values.password };

      const response = await api.post(endpoint, payload);

      if (!isRegister) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        const userResponse = await api.get("/auth/me");
        const user = userResponse.data;

        setUser(user);

        toast.success(`Welcome back, ${user.name}!`);
        router.push("/");
      } else {
        toast.success("Registration successful! You can now log in.");
        setIsRegister(false);
      }

      reset();
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = (): void => {
    setIsRegister(!isRegister);
    reset();
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)",
        padding: "2rem",
      }}
    >
      {/* Animated background dots */}
      <div
        className="absolute w-2 h-2 rounded-full opacity-60"
        style={{
          top: "5rem",
          left: "5rem",
          backgroundColor: "var(--color-accent)",
          animation: "pulse 2s infinite",
        }}
      />
      <div
        className="absolute w-1 h-1 rounded-full opacity-40"
        style={{
          top: "10rem",
          right: "8rem",
          backgroundColor: "var(--color-accent)",
          animation: "pulse 2s infinite 0.5s",
        }}
      />
      <div
        className="absolute w-1.5 h-1.5 rounded-full opacity-50"
        style={{
          bottom: "8rem",
          left: "10rem",
          backgroundColor: "var(--color-accent)",
          animation: "pulse 2s infinite 1s",
        }}
      />

      <div className="w-full max-w-sm relative z-10">
        <Card
          className="overflow-hidden relative border-0"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            borderRadius: "1.5rem",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 50%, rgba(212,175,55,0.05) 100%)",
            }}
          />

          <CardContent className="p-6 relative z-10">
            <div className="space-y-6">
              {/* Header Section */}
              <div className="flex flex-col items-center space-y-4">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 64,
                    height: 64,
                    background: "linear-gradient(135deg, var(--color-accent) 0%, #B8860B 100%)",
                    borderRadius: "1rem",
                    boxShadow: "0 8px 32px rgba(212, 175, 55, 0.3)",
                  }}
                >
                  <Diamond size={32} color="white" strokeWidth={1.5} />
                </div>

                <div className="flex flex-col items-center space-y-1">
                  <h1
                    className="text-3xl font-light tracking-wide"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--color-primary)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    LUMIÈRE
                  </h1>

                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i: number) => (
                      <Star
                        key={i}
                        size={12}
                        fill="var(--color-accent)"
                        color="var(--color-accent)"
                      />
                    ))}
                  </div>

                  <h2
                    className="text-2xl font-light mt-2"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--color-primary)",
                    }}
                  >
                    {isRegister ? "Join Our Collection" : "Welcome Back"}
                  </h2>

                  <p
                    className="text-sm font-light"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-secondary)",
                    }}
                  >
                    {isRegister ? "Discover timeless elegance" : "Continue your journey with us"}
                  </p>
                </div>
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {isRegister && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 500,
                        color: "var(--color-primary)",
                      }}
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      className="h-12 border-2 transition-all duration-200"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        borderColor: "var(--color-highlight)",
                        borderRadius: "0.75rem",
                        fontFamily: "var(--font-body)",
                      }}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      color: "var(--color-primary)",
                    }}
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="hello@example.com"
                    className="h-12 border-2 transition-all duration-200"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      borderColor: "var(--color-highlight)",
                      borderRadius: "0.75rem",
                      fontFamily: "var(--font-body)",
                    }}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      color: "var(--color-primary)",
                    }}
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-12 border-2 transition-all duration-200 pr-10"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        borderColor: "var(--color-highlight)",
                        borderRadius: "0.75rem",
                        fontFamily: "var(--font-body)",
                      }}
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full border-0 text-white font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                  style={{
                    background: "linear-gradient(135deg, var(--color-accent) 0%, #B8860B 100%)",
                    marginTop: "1rem",
                    height: "48px",
                    fontFamily: "var(--font-body)",
                    borderRadius: "0.75rem",
                    boxShadow: "0 4px 20px rgba(212, 175, 55, 0.3)",
                  }}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : null}
                  {isRegister ? "Create Account" : "Sign In"}
                </Button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <Separator className="flex-1" />
                <Sparkles size={16} color="var(--color-accent)" className="mx-4" />
                <Separator className="flex-1" />
              </div>

              {/* Toggle Section */}
              <div className="flex flex-col items-center space-y-2">
                <p
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-secondary)",
                  }}
                >
                  {isRegister ? "Already have an account?" : "Don't have an account?"}
                </p>

                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="text-sm font-semibold underline underline-offset-4 transition-colors"
                  style={{
                    color: "var(--color-accent)",
                    fontFamily: "var(--font-body)",
                    textDecorationColor: "var(--color-accent)",
                  }}
                >
                  {isRegister ? "Sign In Instead" : "Create New Account"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p
          className="text-xs text-center mt-6 font-light opacity-80"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-secondary)",
          }}
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthPage;