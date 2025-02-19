"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../ui/theme-toggle";
import { Button } from "../ui/button";
import { MobileSidebar } from "./MobileSidebar";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";

export const Topbar = () => {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <header className="flex w-full justify-between items-center border border-b-muted p-3">
      <div className="flex items-center md:hidden">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <span className="text-2xl ml-2 font-bold">Taskify</span>
      </div>
      <div className="ml-auto flex items-center gap-4 justify-end">
        <ModeToggle />
        <Button onClick={handleLogout}>Sign Out</Button>{" "}
        {/* ✅ Logout Button */}
        <MobileSidebar />
      </div>
    </header>
  );
};
