import React, { useContext } from 'react';
import { useAlert } from './ContextContext';

export const Main = () => {
  const { toggleAlert } = useAlert();

  return (
    <>
      <h1>Пример с Context</h1>
      <button className="btn btn-success" onClick={toggleAlert}>Показать alert</button>
    </>
  );
};