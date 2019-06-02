import { combineReducers } from 'redux';

const text = (state = '', action) => {
  switch (action.type) {
    case 'TEXT_UPDATE': {
      return action.payload.text;
    }
    case 'TASK_ADD': {
      return '';
    }
    default:
      return state;
  }
};

// BEGIN (write your solution here)
const tasks = (state = [], action) => {
  const { type, payload } = action;
  const newState = [...state];

  switch(type) {
    case 'TASK_ADD':
      newState.unshift(payload.text);
      return newState;

    case 'TASK_REMOVE':
      newState.splice(payload.index, 1);
      return newState;

    default:
      return state;
  }
};
// END

export default combineReducers({
  text,
  tasks,
});
