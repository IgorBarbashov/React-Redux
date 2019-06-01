// Реализуйте в Store следующую структуру состояния:
// {
//   comments: {
//     1: { id: 1, taskId: 1, body: 'comment 1' },
//     2: { id: 2, taskId: 1, body: 'comment 2' },
//     5: { id: 5, taskId: 2, body: 'another comment' },
//   },
//   tasks: {
//     1: { id: 1, name: 'first task' },
//     2: { id: 2, name: 'second task' },
//   },
// }
// Store должен уметь обрабатывать перечисленные в файле actions.js действия.


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
  
//   export const addTaskComment = comment => ({
//     type: 'TASK_COMMENT_ADD',
//     payload: {
//       comment,
//     },
//   });
  
//   export const removeTaskComment = id => ({
//     type: 'TASK_COMMENT_REMOVE',
//     payload: {
//       id,
//     },
//   });


// reducers.js
import _ from 'lodash';
import { combineReducers } from 'redux';

// BEGIN (write your solution here)
const comments = (state= {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'TASK_COMMENT_ADD':
      return {
        ...state,
        [payload.comment.id]: payload.comment
      };

    case 'TASK_COMMENT_REMOVE':
      return _.omit(state, payload.id);

    case 'TASK_REMOVE':
      let newState = { ...state };
      
      for (let key in state) {
        if (state[key].taskId === payload.id) {
          newState = _.omit(newState, key);
        }
      }
      return newState;

    default:
      return state;
  }
};

const tasks = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'TASK_ADD':
      return {
        ...state,
        [payload.task.id]: payload.task
      };
    
    case 'TASK_REMOVE':
      return _.omit(state, payload.id);

    default:
      return state;
  }
};

export default combineReducers({ tasks, comments});
// END
