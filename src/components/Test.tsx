import { useState, useMemo } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // ❌ WITHOUT useMemo: Runs on EVERY render (even when name changes)
  const expensiveCalculation1 = count * 1000;

  // ✅ WITH useMemo: Only runs when count changes
  const expensiveCalculation = useMemo(() => {
    console.log("Calculating...");
    return count * 1000;
  }, [count]); // Only recalculate if count changes

  return (
    <div>
      <p>
        Result: expensiveCalculation1: {expensiveCalculation1} or
        expensiveCalculation: {expensiveCalculation}
      </p>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}


1. start with "use" and not called inside condition
2. If there is the same logic repeated in multiple components, we can re use it
3. yes it can