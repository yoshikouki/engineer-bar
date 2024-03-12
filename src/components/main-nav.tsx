import { Maximize, Minimize } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";

export const MainNav = () => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <nav className="pointer-events-none fixed bottom-0 z-10 flex w-full justify-center">
      <div className="flex w-screen max-w-md justify-between py-8">
        {currentPath.startsWith("/app") && (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
};
