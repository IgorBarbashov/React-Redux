import React from 'react';
import { Main } from './ContextMain';
import { Alert } from './ContextAlert';
import { ContextContext } from './ContextContext';

function App() {
  return (
    <ContextContext>
      <div className="container">
        <Alert />
        <Main />
      </div>
    </ContextContext>
  );
}

export default App;
