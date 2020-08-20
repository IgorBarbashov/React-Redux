import React, { useState, useContext } from 'react';

const AlertContext = React.createContext();

export const useAlert = () => {
  return useContext(AlertContext);
}

export const ContextContext = ({ children }) => {
  const [alert, setAlert] = useState(false);
  const toggleAlert = () => setAlert(prev => !prev);

  return (
    <AlertContext.Provider value={{ alert, toggleAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
