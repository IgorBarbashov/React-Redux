import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

// BEGIN (write your solution here)
const text = handleActions({
  [actions.updateNewTaskText](state, { payload }) { return payload },
  [actions.addTask](state, { payload }) { return '' }
}, '');

const tasks = handleActions({
  [actions.addTask](state, { payload }) { return [payload, ...state] },
  [actions.removeTask](state, { payload }) { return state.filter(task=>task.id !== payload) }
},[]);
// END

export default combineReducers({
  text,
  tasks,
});
