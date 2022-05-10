import React from 'react';
import { Link } from 'react-router-dom';

function Navegacao() {
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
              to="/customer/ordersnp"
              data-testid="customer_products__element-navbar-link-orders"
              className="nav-link active"
            >
              MEUS PRODUTOS
            </Link>
          </li>
          <li>
            <p
              data-testid="customer_products__element-navbar-user-full-name"
            >
              Nome da pessoa
            </p>
          </li>
          <li>
            <button
              type="button"
              data-testid="customer_products__element-navbar-link-logout"
            >
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navegacao;
