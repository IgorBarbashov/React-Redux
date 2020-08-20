import React, { useState, useCallback } from 'react';
import { UseCallbackHelper } from './UseCallbackHelper';

function App() {
  const [colored, setColored] = useState(false);
  const [count, setCount] = useState(1);

  const style = {
    color: colored ? 'blue'  : 'red'
  }

  // const generateItemsFromAPI = (start) => {
  //   console.log('in callback');
  //   return new Array(count).fill('').map((_, i) => `Элемент ${i + start}`);
  // };

  const generateItemsFromAPI = useCallback((start) => {
    console.log('in callback');
    return new Array(count).fill('').map((_, i) => `Элемент ${i + start}`);
  }, [count]);

  return (
    <div>
      <h1 style={style}>Количество элементов: {count}</h1>
      <button className="btn btn-success" onClick={() => setCount(prev => prev + 1)}>
        Добавить
      </button>
      <button className="btn btn-warning" onClick={() => setColored(prev => !prev)}>
        Изменить
      </button>

      <UseCallbackHelper getItems={generateItemsFromAPI} />
    </div>
  );
}

export default App;
