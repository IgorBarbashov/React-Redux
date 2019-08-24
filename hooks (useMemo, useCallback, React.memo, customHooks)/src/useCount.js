import { useState, useEffect } from "react";

export const useCount = add => {
  const [count, setCount] = useState(0);
  console.log("in useCount - add:", add);
  console.log("in useCount - count:", count);

  useEffect(() => {
    console.log("in useEffect in useCount");
    setTimeout(() => {
      console.log("changing count");
      setCount(count => count + add);
      console.log("--------------------");
    }, 1000);
  }, [add]);

  return [count];
};
