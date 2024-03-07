import { Button } from "@/components/ui/button";
import { useState } from "react";

export const App = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <Button onClick={() => setCount(count + 1)}>{count}</Button>
    </>
  );
};
