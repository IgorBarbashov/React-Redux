import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const tasks = handleActions({
  [actions.addTask](state, { payload: { task } }) {
    const { byId, allIds } = state;
    return {
      byId: { [task.id]: task, ...byId },
      allIds: [task.id, ...allIds],
    };
  },
  // BEGIN (write your solution here)
  [actions.removeTask](state, { payload: { id } }) {
    const { byId, allIds } = state;
    const newbyId = _.omit(byId, id);
    const newAllIds = allIds.filter(currentID=>currentID !== id);

    return {
      byId: newbyId,
      allIds: newAllIds
    };
  },

  [actions.toggleTaskState](state, { payload: { id } }) {
    const { byId, allIds } = state;
    const newById = {};
    
    for (let key in byId) {
      let newState = byId[key].state;
      if (byId[key].id === id) {
        newState = byId[key].state === 'active' ? '' : 'active';
      }
      newById[key] = {
          id: byId[key].id,
          text: byId[key].text,
          state: newState
      };
    }

    return { byId: newById, allIds };
  },
  // END
}, { byId: {}, allIds: [] } );

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
  text,
});
