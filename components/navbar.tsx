"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollText, LineChart, Home, Info } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/stocks",
      label: "Halal Stocks",
      icon: LineChart,
      active: pathname === "/stocks",
    },
    {
      href: "/blog",
      label: "Blog",
      icon: ScrollText,
      active: pathname === "/blog",
    },
    {
      href: "/about",
      label: "About",
      icon: Info,
      active: pathname === "/about",
    },
  ];

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Sharia Stock Info
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    route.active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <route.icon className="w-4 h-4" />
                  <span>{route.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
