// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход начальное состояние, а возвращает store.
// Store должен обрабатывать действия перечисленные в actions.js.
// Структура состояния в store: { [task.id]: task, [task2.id]: task2 }.

// actions.js
// export const addTask = task => ({
//     type: 'TASK_ADD',
//     payload: {
//       task,
//     },
//   });
//   export const removeTask = id => ({
//     type: 'TASK_REMOVE',
//     payload: {
//       id,
//     },
//   });
  
// Решение
import { omit } from 'lodash';
import { createStore } from 'redux';

// BEGIN (write your solution here)
export default initStore => createStore(reducer, initStore);

const reducer = (store = {}, action) => {
  const { type, payload } = action;

  switch(type) {
    case 'TASK_ADD':
      return ({
        ...store,
        [payload.task.id]: payload.task
      });
    
    case 'TASK_REMOVE':
      return omit(store, payload.id);
    
    default:
      return store;
  }
};
// END
