import React, { useContext } from 'react';
import { AlertContext } from './ContextContext';

export const Main = () => {
  const { show, hide } = useContext(AlertContext);

  return (
    <>
      <h1>Пример с Context и useReduce</h1>
      <button className="btn btn-success" onClick={() => show('new text')}>Показать alert</button>
      <button className="btn btn-success" onClick={hide}>Скрыть alert</button>
    </>
  );
};