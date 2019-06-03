import { createAction } from 'redux-actions';

export const addTask = createAction('TASK_ADD');
export const updateNewTaskText = createAction('NEW_TASK_TEXT_UPDATE');
// BEGIN (write your solution here)
export const inverseTaskTheme = createAction('TOGGLE_UI_STATE');
// END
