import { Maximize, Minimize } from "lucide-react";
import { Button } from "./ui/button";

export const MainNav = () => {
  return (
    <header className="fixed bottom-0 z-10 max-w-md w-screen flex justify-between py-8 pointer-events-none">
      <Button className="pointer-events-auto px-4 py-8" variant="ghost">
        <span className="mr-2">
          <Maximize />
        </span>
        Global
      </Button>
      <Button className="pointer-events-auto px-4 py-8" variant="ghost">
        <span className="mr-2">
          <Minimize />
        </span>
        Local
      </Button>
    </header>
  );
};
