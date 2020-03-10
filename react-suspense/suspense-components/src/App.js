import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList/TodoList'
// import AddTodo from './components/TodoList/AddTodo'
import { Spinner } from './components/Spinner/Spinner'
import Context from './context';

const AddTodo = React.lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve(import('./components/TodoList/AddTodo'));
  }, 3000);
}));

function App() {
  const [todos, setTodos] = useState([]);
  const [counter, setCounter] = useState(todos.length);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(json => setTimeout(() => {
        setTodos(json);
        setPending(false);
      }, 2000));
  }, []);

  const toggleCompleted = (id) => {
    setTodos(prevTodos => {
      const newTodos = [...prevTodos];
      newTodos[id].completed = !prevTodos[id].completed;
      return newTodos;
    });
  }

  const delItem = (id) => {
    setTodos(prevTodos => prevTodos.filter(el => el.id !== id) )
  }

  const addItem = (title) => {
    setTodos(prevTodos => [...prevTodos, { id: counter + 1, title, completed: false}]);
    setCounter(prevCounter => prevCounter + 1);
  }

  return (
    <Context.Provider value={{ addItem, delItem }} >
      <div className="wrapper">
        <h1>React tutorial</h1>
        { pending ? <Spinner /> :
          <>
            { todos.length
              ? <TodoList todos={todos} toggleCompleted={toggleCompleted} />
              : <div>No todos</div> 
            }
            <React.Suspense fallback={<Spinner />}>
              <AddTodo />
            </React.Suspense>
          </>
        }
      </div>
    </Context.Provider>
  );
}

export default App;
