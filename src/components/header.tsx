import { Settings } from "lucide-react";
import { Logo } from "./logo";
import { Theme, useTheme } from "./theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="fixed top-0 z-10 w-full pointer-events-none flex justify-center">
      <div className="flex justify-between items-center max-w-md w-full p-4">
        <a href="/" className="pointer-events-auto">
          <h1 className="flex items-center text-primary">
            <Logo />
          </h1>
        </a>
        <div className="pointer-events-auto">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-center items-center">
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
