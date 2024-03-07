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
    <header className="fixed top-0 z-10 max-w-md w-screen flex justify-between p-4 pointer-events-none">
      <a href="/" className="flex items-center pointer-events-auto">
        <h1 className="inline-flex justify-center items-center">
          <Logo />
        </h1>
      </a>
      <div className="pointer-events-auto text-muted-foreground">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-center items-center">
            <Settings />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={theme}
              onValueChange={(string) => setTheme(string as Theme)}
              className="text-muted-foreground"
            >
              <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="system">
                System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
