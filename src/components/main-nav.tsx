import { Maximize, Minimize } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";

export const MainNav = () => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <>
      {currentPath.startsWith("/app") && (
        <nav className="fixed bottom-0 z-10 max-w-md w-screen flex justify-between py-8 pointer-events-none">
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
        </nav>
      )}
    </>
  );
};
