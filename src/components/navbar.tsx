"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import Logo from "./logo";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { UserButton } from "@clerk/nextjs";

function Navbar() {
  return (
    <>
      <DesktopNav />
      <MobileNavbar />
    </>
  );
}

export default Navbar;

const items = [
  {
    label: "Dashbaord",
    link: "/",
  },
  { label: "Transactions", link: "/transactions" },
  { label: "Settings", link: "/settings" },
];
function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]" side="left">
            <Logo />
            <div className="flex flex-col gap-1 pt-4">
              {items.map((item) => (
                <NavbarItem
                  key={item.label}
                  link={item.link}
                  label={item.label}
                  clickCallback={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
}
const DesktopNav = () => {
  return (
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center">
          <Logo />
          <div className="flex h-full ml-8 gap-x-4">
            {items.map((item) => (
              <NavbarItem
                key={item.label}
                link={item.link}
                label={item.label}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
};

function NavbarItem({
  link,
  label,
  clickCallback,
}: {
  link: string;
  label: string;
  clickCallback?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative flex items-center">
      <Button asChild variant={isActive ? "secondary" : "ghost"}>
        <Link
          href={link}
          onClick={() => {
            if (clickCallback) clickCallback();
          }}
        >
          {label}
        </Link>
      </Button>
    </div>
  );
}
