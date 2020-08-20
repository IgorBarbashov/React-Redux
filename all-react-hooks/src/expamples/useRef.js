import React, { useState, useEffect, useRef } from 'react';

// let renderCount = 1;

function App() {
  const [value, setValue] = useState('initial');
  const renderCount = useRef(1);
  const inputRef = useRef(null);
  const prevValue = useRef('');

  useEffect(() => {
    renderCount.current++;
    console.log(inputRef.current.value);
  })

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  const focus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <h1>Value: {value}</h1>
      <h1>Prev value: {prevValue.current}</h1>
      <h1>Render Count: {renderCount.current}</h1>
      <input ref={inputRef} type='text' value={value} onChange={e => setValue(e.target.value)} />
      <button className="btn btn-success" onClick={focus}>Фокус</button>
    </div>
  );
}

export default App;
