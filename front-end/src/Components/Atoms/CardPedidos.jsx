import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../../Style/Card.css';

function CardPedidos({ item }) {
  return (
    <Link
      to={ `/customer/orders/${item.id}` }
      className="d-flex flex-row justify-content-between card m-2 me-4 p-2"
    >
      <div className="" data-testid={ `customer_orders__element-order-id-${item.id}` }>
        pedido:
        { item.id }
      </div>
      <div data-testid={ `customer_orders__element-delivery-status-${item.id}` }>
        { item.status }
      </div>
      <div>
        <div data-testid={ `customer_orders__element-order-date-${item.id}` }>
          { item.saleDate }
        </div>
        <div>
          R$:
          { item.totalPrice.toFixed(2) }
        </div>
      </div>
    </Link>
  );
}

CardPedidos.propTypes = {
  item: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default CardPedidos;
