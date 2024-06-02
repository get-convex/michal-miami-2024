import { api } from "@/utils/api";

const COUNTER_NAME = "first";

export default function Home() {
  const { data: count } = api.counter.get.useQuery({
    name: COUNTER_NAME,
  });
  const incrementCount =
    api.counter.increment.useMutation();

  return (
    <>
      <div>Counter is {count}</div>
      <button
        onClick={() =>
          incrementCount.mutate({ name: COUNTER_NAME })
        }
      >
        Increment counter
      </button>
    </>
  );
}
