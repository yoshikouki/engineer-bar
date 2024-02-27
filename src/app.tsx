import { useState } from "react";

export const App = () => {
  console.log("App");
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>エンジニアBar</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} type="button">Increment</button>
    </>
  );
};
