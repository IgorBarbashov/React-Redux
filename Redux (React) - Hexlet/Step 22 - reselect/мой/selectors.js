import { createSelector } from 'reselect';

// BEGIN (write your solution here)
export const filteredTasksSelector = ({ tasks: {byId, allIds, currentFilterName} }) => {
  let filteredTasts = allIds;
  
  if (currentFilterName !== 'all') {
    filteredTasts = filteredTasts.filter(id => byId[id].state === currentFilterName);
  }

  filteredTasts = filteredTasts.map(id => byId[id]);

  return filteredTasts;
};
// END