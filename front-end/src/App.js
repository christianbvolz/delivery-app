import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Login, Main } from './Pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Main } />
      <Route path="/login" component={ Login } />
    </Switch>
  );
}

export default App;
