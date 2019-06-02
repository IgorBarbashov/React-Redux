export const updateNewTaskText = text => ({
    type: 'TEXT_UPDATE',
    payload: {
      text,
    },
  });
  
  // BEGIN (write your solution here)
  export const addTask = text => ({
    type: 'TASK_ADD',
    payload: {
      text
    }
  });
  
  export const removeTask = index => ({
    type: 'TASK_REMOVE',
    payload: {
      index
    }
  });
  // END
  