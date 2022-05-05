import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Login, Main, Register, Products } from './Pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Main } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Products } />
    </Switch>
  );
}

export default App;
