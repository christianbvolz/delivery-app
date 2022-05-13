import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardPedidos({ item }) {
  return (
    <Link
      to={ `/customer/orders/${item.id}` }
      className="d-flex flex-row justify-content-between card m-2 me-4 p-2"
    >
      <div className="">
        <h5>Pedido:</h5>
        <h4 data-testid={ `customer_orders__element-order-id-${item.id}` }>
          { item.id }
        </h4>
      </div>
      <div>
        <h3 data-testid={ `customer_orders__element-delivery-status-${item.id}` }>
          { item.status }
        </h3>
      </div>
      <div>
        <div>
          <h3 data-testid={ `customer_orders__element-order-date-${item.id}` }>
            { item.saleDate }
          </h3>
        </div>
        <div>
          <h3 data-testid={ `customer_orders__element-card-price-${item.id}` }>
            { `R$: ${item.totalPrice.replace('.', ',')}` }
          </h3>
        </div>
      </div>
    </Link>
  );
}

CardPedidos.propTypes = {
  item: PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
};

export default CardPedidos;
