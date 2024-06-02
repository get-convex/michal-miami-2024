import { useState } from "react";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>Counter is {count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment counter
      </button>
    </>
  );
}
