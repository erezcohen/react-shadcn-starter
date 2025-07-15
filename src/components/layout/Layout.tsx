import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-6">
        <Outlet />
      </main>
    </div>
  );
}
