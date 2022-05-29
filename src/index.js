import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main';
import Signup from './components/Signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
    <Signup />
  </React.StrictMode>
);
