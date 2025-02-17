"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="md:hidden " asChild>
        <Button size="icon" variant={"outline"}>
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[280px]">
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
                onClick={() => setIsSheetOpen(false)}
              >
                <Icon className="size-6" />
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};
