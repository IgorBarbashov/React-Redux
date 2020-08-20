import React, { useState, useMemo, useEffect } from 'react';

const ComplexCompute = (number) => {
  console.log('in ComplexCompute');
  let i = 0;
  while ( i< 1000000000) {
    i++;
  }
  return number * 2;
};

function App() {
  const [number, setNumber] = useState(42);
  const [colored, setColored] = useState(false);
  
  // const computed = ComplexCompute(number);

  const computed = useMemo(() => {
    return ComplexCompute(number);
  }, [number]);

  // const style = {
  //   color: colored ? 'blue'  : 'red'
  // }

  const style = useMemo(() => {
    return { color: colored ? 'blue'  : 'red' };
  }, [colored]);

  useEffect(() => {
    console.log('Styles changed');
  }, [style]);
  
  return (
    <div>
      <h1 style={style}>Вычисляемое свойство: {computed}</h1>
      <button className="btn btn-success" onClick={() => setNumber(prev => prev + 1)}>
        Добавить
      </button>
      <button className="btn btn-danger" onClick={() => setNumber(prev => prev - 1)}>
        Убрать
      </button>
      <button className="btn btn-warning" onClick={() => setColored(prev => !prev)}>
        Изменить
      </button>
    </div>
  );
}

export default App;
