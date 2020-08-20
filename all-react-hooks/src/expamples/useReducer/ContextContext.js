import React, { useReducer } from 'react';

export const AlertContext = React.createContext();

const SHOW_ALERT = 'show';
const HIDE_ALERT = 'hide';

const reducer = (state, action) => {
  switch(action.type) {
    case SHOW_ALERT:
      return { ...state, alert: true, text: action.text };
    case HIDE_ALERT:
      return { ...state, alert: false };
    default:
      return state;
  }
}

export const ContextContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { alert: false, text: '' });

  const show = (text) => dispatch({ type: SHOW_ALERT, text });
  const hide = () => dispatch({ type: HIDE_ALERT });

  return (
    <AlertContext.Provider value={{ alert: state.alert, show, hide, text: state.text }}>
      {children}
    </AlertContext.Provider>
  );
};
