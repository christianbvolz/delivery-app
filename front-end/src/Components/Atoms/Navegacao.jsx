import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ButtonOnClick from './ButtonOnClick';

function Navegacao() {
  const [userName, setUserName] = useState('');
  const history = useHistory();

  useEffect(() => {
    const { name } = JSON.parse(localStorage.getItem('user'));
    setUserName(name);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    history.push('/login');
  };

  return (
    <div className="bg-success text-dark">
      <nav className="navbar navbar-expand-lg navbar-light ">
        <ul className="navbar-nav">
          <li className="nav-item p-3">
            <Link
              to="/customer/products"
              data-testid="customer_products__element-navbar-link-products"
              className="nav-link active"
            >
              PRODUTOS
            </Link>
          </li>
          <li className="nav-item p-3">
            <Link
              to="/customer/orders"
              data-testid="customer_products__element-navbar-link-orders"
              className="nav-link active"
            >
              MEUS PEDIDOS
            </Link>
          </li>
          <li>
            <p
              data-testid="customer_products__element-navbar-user-full-name"
            >
              { userName }
            </p>
          </li>
          <li>
            <ButtonOnClick
              disabled={ false }
              testid="customer_products__element-navbar-link-logout"
              onClick={ logout }
            >
              Sair
            </ButtonOnClick>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navegacao;
