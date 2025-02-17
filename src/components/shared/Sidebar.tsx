"use client";

import { navLinks } from "@/data";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="hidden md:flex flex-col border border-r-muted w-1/6 px-8 py-6 bg-background h-screen sticky top-0 left-0 z-50">
      <div className="flex justify-center items-center">
        <Image src="/logo.svg" alt="logo" width={30} height={30} />
        <span className="text-2xl ml-2 font-bold">Taskify</span>
      </div>
      <ul className="flex flex-col items-start h-full justify-start mt-16 gap-5">
        {navLinks.map(({ name, href, Icon }) => (
          <li key={name}>
            <Link
              href={href}
              className={`flex items-center justify-center w-full font-semibold text-xl gap-2 py-2 px-3 pr-6 ${
                pathname === href
                  ? "dark:text-primary bg-primary/50 text-black dark:bg-primary/10  rounded-lg"
                  : ""
              }`}
            >
              <Icon className="size-6" />
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
