import React, { useContext } from 'react';
import { AlertContext } from './ContextContext';

export const Alert = () => {
  const { alert, hide, text } = useContext(AlertContext);
  console.log(text);

  if (!alert) {
    return null;
  }

  return (
    <div className="alert alert-danger" onClick={hide} >
      {text}
    </div>
  )
};