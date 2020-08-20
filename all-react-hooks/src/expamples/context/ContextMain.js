import React, { useContext } from 'react';
import { AlertContext } from './ContextContext';

export const Main = () => {
  const { toggleAlert } = useContext(AlertContext);

  return (
    <>
      <h1>Пример с Context</h1>
      <button className="btn btn-success" onClick={toggleAlert}>Показать alert</button>
    </>
  );
};