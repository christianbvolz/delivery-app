import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import {
  Login,
  Main,
  Register,
  Products,
  Checkout,
  Pedidos,
  VendedorPedidos,
} from './Pages';
import OrderDetails from './Pages/OrderDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Main } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Products } />
      <Route path="/customer/orders/:id" component={ OrderDetails } />
      <Route path="/customer/orders" component={ Pedidos } />
      <Route path="/customer/checkout" component={ Checkout } />
      <Route path="/seller/orders" component={ VendedorPedidos } />
    </Switch>
  );
}

export default App;
