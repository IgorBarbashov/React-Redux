import React, { useContext } from 'react';
import { AlertContext } from './ContextContext';

export const Alert = () => {
  const { alert, toggleAlert } = useContext(AlertContext);

  if (!alert) {
    return null;
  }

  return (
    <div className="alert alert-danger" onClick={toggleAlert} >
      Важное сообщение
    </div>
  )
};