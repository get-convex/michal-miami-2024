import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function App() {
  return (
    <>
      <Counter name="first" />
      <Counter name="second" />
      <Counter name="third" />
    </>
  );
}

function Counter({ name }: { name: string }) {
  const count = useQuery(api.counter.get, { name });
  const incrementCount = useMutation(api.counter.increment);
  return (
    <div className="counter">
      <div>
        {name} is {count}
      </div>
      <button onClick={() => void incrementCount({ name })}>
        Increment {name}
      </button>
    </div>
  );
}
