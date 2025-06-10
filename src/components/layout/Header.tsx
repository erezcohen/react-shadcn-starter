import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Database, Server } from "lucide-react";

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2">
          <Database className="h-6 w-6" />
          <span className="font-bold text-xl">DCMS</span>
        </div>
        <nav className="flex items-center space-x-6 ml-6">
          <Link
            to="/data-centers"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary flex items-center space-x-2",
              isActive("/data-centers")
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            <Server className="h-4 w-4" />
            <span>Data Centers</span>
          </Link>
          <Link
            to="/devices"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary flex items-center space-x-2",
              isActive("/devices") ? "text-foreground" : "text-foreground/60"
            )}
          >
            <Database className="h-4 w-4" />
            <span>Devices</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
