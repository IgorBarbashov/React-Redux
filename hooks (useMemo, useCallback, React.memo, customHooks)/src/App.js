import React, { useState, useMemo, useCallback } from "react";
import { Child1 } from "./child1.js";
import { Child2 } from "./child2.js";
import { useCount } from "./useCount";

let lastGenerateNewValue;
let lastValue;
let lastIncrement;
let lastCount;

function App() {
  console.log("render App");

  // custom hook ////////////////////////////////////////////////////////////
  const [initCustomCount, setInitCustomCount] = useState(5);
  console.log("initCustomCount:", initCustomCount);

  const [customCount] = useCount(initCustomCount);
  console.log("customCount:", customCount);

  const newCustonCount = () => Math.floor(Math.random() * 1000);
  //////////////////////////////////////////////////////////////

  // useCallback ////////////////////////////////////////////////////////////
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);

  const generateNewValue = useCallback(() => {
    console.log("generateNewValue - value:", value);
    setValue(Math.floor(Math.random() * 100));
  }, [value]);
  if (value !== lastValue) {
    lastValue = value;
    console.log("useCallback DOSEN'T WORK in value !!!!!!!!!!");
  }
  if (generateNewValue !== lastGenerateNewValue) {
    lastGenerateNewValue = generateNewValue;
    console.log("useCallback DOSEN'T WORK in generateNewValue !!!!!!!!!!");
  }
  const bigValue = useMemo(() => {
    console.log("calculate bigValue");
    return value ** value;
  }, [value]);

  const increment = useCallback(() => {
    console.log("increment - count:", count);
    setCount(count + 1);
  }, [count]);
  if (lastIncrement !== increment) {
    lastIncrement = increment;
    console.log("useCallback DOSEN'T WORK in increment !!!!!!!!!!");
  }
  if (lastCount !== count) {
    lastCount = count;
    console.log("useCallback DOSEN'T WORK in count !!!!!!!!!!");
  }
  const bigCount = useMemo(() => {
    console.log("calculate bigCount");
    return count ** count;
  }, [count]);
  //////////////////////////////////////////////////////////////

  return (
    <div>
      <div>customCount: {customCount}</div>
      <div>initCustomCount: {initCustomCount}</div>
      <div onClick={() => setInitCustomCount(initCustomCount)}>
        show current customCount
      </div>
      <div onClick={() => setInitCustomCount(newCustonCount())}>
        show new customCount
      </div>

      {/* <Child1 count={count} increment={increment} />
      <Child2 value={value} generateNewValue={generateNewValue} /> */}
      <Child1 bigCount={bigCount} count={count} increment={increment} />
      <Child2
        bigValue={bigValue}
        value={value}
        generateNewValue={generateNewValue}
      />
    </div>
  );
}

export default App;
