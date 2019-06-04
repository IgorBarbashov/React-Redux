import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const tasks = handleActions({
  [actions.addTask](state, { payload: { task } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [task.id]: task },
      allIds: [task.id, ...allIds],
    };
  },
}, { byId: {}, allIds: [] });

const tasksUIState = handleActions({
  // BEGIN (write your solution here)
  [actions.addTask](state, { payload: { task } }) {
    return { ...state, [task.id]: 'bg-light text-dark'}
  },
  [actions.inverseTaskTheme](state, { payload: id }) {
    return {
      ...state,
      [id]: state[id] === 'bg-light text-dark' ? 'bg-dark text-light' : 'bg-light text-dark'
    };
  }
  // END
}, {});

const text = handleActions({
  [actions.addTask]() {
    return '';
  },
  [actions.updateNewTaskText](state, { payload }) {
    return payload.text;
  },
}, '');

export default combineReducers({
  tasks,
  tasksUIState,
  text,
});
