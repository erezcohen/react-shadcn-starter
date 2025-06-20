import { ModeToggle } from "./mode-toggle";

export function AppFooter() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 min-h-[3rem] md:h-20 py-2 md:flex-row">
      <div className="hidden md:block md:ml-auto">
        <ModeToggle />
      </div>
    </footer>
  );
}
