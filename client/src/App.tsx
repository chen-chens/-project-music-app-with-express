import './App.css';
import React from 'react';
import { useRoutes } from 'react-router';
import { routes } from './routes';


function App() {
  let element = useRoutes(routes);

  return element;
}

export default App;
