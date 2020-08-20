import React, { useState, useEffect } from 'react';

export const UseCallbackHelper = ({ getItems }) => {
  const  [items, setItems] = useState([]);
  
  useEffect(()=> {
    const newItems = getItems(42);
    setItems(newItems);
    console.log('in useEffect');
  }, [getItems]);

  return (
    <ul>
      {items.map(i => <li key={i}>{i}</li>)}
    </ul>
  )
};
