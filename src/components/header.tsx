import type { BarEvent } from "@/hooks/use-data";
import { Settings } from "lucide-react";
import { Logo } from "./logo";
import { type Theme, useTheme } from "./theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Header = ({ event }: { event?: BarEvent }) => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="pointer-events-none fixed top-0 z-10 flex w-full justify-center bg-gradient-to-b from-background/90 via-70% via-background/60 to-background/0">
      <div className="flex w-full max-w-md items-center justify-between p-4">
        <h1 className="flex items-center gap-2 text-primary">
          <a href="/" className="pointer-events-auto">
            <Logo />
            <span className="sr-only">エンジニアBar</span>
          </a>
          {event && (
            <a
              href={event.supporters[0]?.url}
              className="inline-flex items-baseline gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-base text-foreground">feat.</span>
              <span className="font-black text-2xl">
                {event.supporters[0]?.short_name}
              </span>
            </a>
          )}
        </h1>
        <div className="pointer-events-auto">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center">
              <Settings />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(string) => setTheme(string as Theme)}
                className="text-foreground"
              >
                <DropdownMenuRadioItem value="light">
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  System
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
