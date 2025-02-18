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

export default function RegisterPage() {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const { register } = useAuthStore();
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
      if (!formData.email || !formData.password || !formData.name) {
        toast.error("Please fill all fields");
        return;
      }
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      setLoading(true);
      const formatedData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      const res = await register(formatedData);
      if (res.data.success == true) {
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        toast.success("Registered successfully");
        setLoading(false);
        router.push("/login");
        return;
      } else {
        console.error(res.data.message);
        toast.error(res.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error("Register:", error);
      toast.error("Failed to register");
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
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
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
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="******"
                    required
                    className=""
                  />
                  <Button
                    onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
                    variant={"ghost"}
                    size={"icon"}
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                  >
                    {isConfirmPasswordVisible ? (
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
