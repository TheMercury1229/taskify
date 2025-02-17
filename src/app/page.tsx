"use client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
export default function Home() {
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="p-4">
      <Button>Hello</Button>
      <ModeToggle />
    </div>
  );
}
