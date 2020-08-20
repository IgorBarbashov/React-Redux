import React, { useState } from 'react';

const computeInitialState = () => {
  console.log('Calculating...');
  return Math.trunc(Math.random() * 20);
}

function App() {
  const [count, setCount] = useState(() => computeInitialState());
  const increase = () => setCount(prev => prev + 1);
  const decrease = () => setCount(prev => prev - 1);
  
  const [state, setState] = useState({ title: 'Счетчик', date: Date.now()});
  const update = () => setState(prev => ({ ...prev, title: 'Новое название' }));

  return (
    <div>
      <h1>Счетчик: {count}</h1>
      <button className="btn btn-success" onClick={increase}>Добавить</button>
      <button className="btn btn-danger" onClick={decrease}>Убрать</button>
      <button className="btn btn-default" onClick={update} >
        Изменить
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default App;
