import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

const COUNTER_NAME = "theone";

export default function App() {
  const name = COUNTER_NAME;
  const count = useQuery(api.counter.get, { name });
  const incrementCount = useMutation(api.counter.increment);

  return (
    <>
      <div>Counter is {count}</div>
      <button onClick={() => void incrementCount({ name })}>
        Increment counter
      </button>
    </>
  );
}
