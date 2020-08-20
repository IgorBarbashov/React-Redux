import React, { useState, useEffect } from 'react';

function App() {
  const [type, setType] = useState('users');
  const [data, setData] = useState([]);
  const [pos, setPos] = useState({ x:0, y:0 });

  const changePosHandler = (e) => {
    setPos({ x: e.clientX, y: e.clientY });
  }

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then(response => response.json())
      .then(json => setData(json));
  }, [type]);

  useEffect(() => {
    window.addEventListener('mousemove', changePosHandler);
    return () => window.removeEventListener('mousemove', changePosHandler);
  }, []);

  return (
    <div>
      <h1>Ресурс: {type}</h1>
      <button className="btn btn-success" onClick={() => setType('users')} >Пользователи</button>
      <button className="btn btn-danger" onClick={() => setType('todos')} >Todos</button>
      <button className="btn btn-success" onClick={() => setType('posts')} >Посты</button>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <pre>{JSON.stringify(pos, null, 2)}</pre>
    </div>
  );
}

export default App;
