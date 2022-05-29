import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main';
import Signup from './components/Signup';
import Welcome from './components/Welcome';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
    <Signup />
    <Welcome />
  </React.StrictMode>
);
