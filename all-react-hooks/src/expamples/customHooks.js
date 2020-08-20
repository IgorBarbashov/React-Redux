import React, { useState, useEffect } from 'react';

function useLogger(value) {
  useEffect(() => {
    console.log('Value changed:', value);
  }, [value])
};

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => setValue(e.target.value);
  const clear = () => setValue('');
  return {
    bind: { value, onChange },
    value,
    clear,
  };
}

function App() {
  const input = useInput('');
  const last = useInput('');
  useLogger(input.value);

  return (
    <div className="container pt-3">
      <input type="text" {...input.bind} />
      <input type="text" {...last.bind} />
      <button onClick={input.clear}>Clear</button>
      <hr />
      <h1>{input.value} {last.value}</h1>
    </div>
  );
};

export default App;
