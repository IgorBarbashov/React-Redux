import { combineReducers } from 'redux';

const text = (state = '', action) => {
  // BEGIN (write your solution here)
  const { type, payload } = action;

  switch (type) {
    case 'TEXT_CHANGE':
      return payload;
    
    case 'TEXT_RESET':
      return '';

    default:
      return state;
  };
  // END
};

export default combineReducers({
  text,
});
