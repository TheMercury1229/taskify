"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!formData.email || !formData.password) {
        toast.error("Please fill all fields");
        return;
      }
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      setLoading(true);
      const res = await login(formData);
      console.log("res", res);
      if (res.data.success == true) {
        setFormData({ email: "", password: "" });
        toast.success("Logged in successfully");
        setLoading(false);
        router.push("/dashboard");
        return;
      } else {
        console.error(res.data.message);
        toast.error(res.data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login");
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col w-full max-w-sm gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="******"
                    required
                    className=""
                  />
                  <Button
                    onClick={handlePasswordVisibility}
                    variant={"ghost"}
                    size={"icon"}
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                  >
                    {isPasswordVisible ? (
                      <EyeOffIcon className="size-5" />
                    ) : (
                      <EyeIcon className="size-5" />
                    )}
                  </Button>
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Loading..." : "Login"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
