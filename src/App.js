import React from 'react';
import ToggleColorMode from './components/ToggleColorMode';

import Router from './routes';

const App = () => {
  return (
    <ToggleColorMode>
      <Router />
    </ToggleColorMode>
  );
};

export default App;
