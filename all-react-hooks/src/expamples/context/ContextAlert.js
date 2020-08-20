import React from 'react';
import { useAlert } from './ContextContext';

export const Alert = () => {
  const { alert, toggleAlert } = useAlert();

  if (!alert) {
    return null;
  }

  return (
    <div className="alert alert-danger" onClick={toggleAlert} >
      Важное сообщение
    </div>
  )
};