"use client";
import { Sidebar } from "@/components/shared/Sidebar";
import { Topbar } from "@/components/shared/Topbar";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loadUser } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    loadUser();
    setLoading(false); // Once loadUser() runs, stop loading
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect only after loadUser() completes
    }
  }, [loading, user, router]);

  if (loading) return <p>Loading...</p>; // Show a loading state while checking auth

  return (
    <main className="flex min-h-screen items-start">
      <Sidebar />
      <div className="w-full md:w-5/6">
        <Topbar />
        {children}
      </div>
    </main>
  );
}
