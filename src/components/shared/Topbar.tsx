import React from "react";
import { ModeToggle } from "../ui/theme-toggle";
import { Button } from "../ui/button";
import { MobileSidebar } from "./MobileSidebar";
import Image from "next/image";

export const Topbar = () => {
  return (
    <header className="flex w-full justify-between items-center border border-b-muted p-3">
      <div className="flex items-center md:hidden">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <span className="text-2xl ml-2 font-bold">Taskify</span>
      </div>
      <div className="ml-auto flex items-center gap-4 justify-end">
        <ModeToggle />
        <Button>Sign Out</Button>
        <MobileSidebar />
      </div>
    </header>
  );
};
