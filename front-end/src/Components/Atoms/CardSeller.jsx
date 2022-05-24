import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardSeller({ item }) {
  return (
    <Link
      to={ `/customer/orders/${item.id}` }
      className="d-flex flex-row justify-content-between card m-2 me-4 p-2"
    >
      <div className="">
        <h5>Pedido:</h5>
        <h4 data-testid={ `seller_orders__element-order-id-${item.id}` }>
          { item.id }
        </h4>
      </div>
      <div>
        <h3 data-testid={ `seller_orders__element-delivery-status-${item.id}` }>
          { item.status }
        </h3>
      </div>
      <div>
        <div>
          <h3 data-testid={ `seller_orders__element-order-date-${item.id}` }>
            { item.saleDate }
          </h3>
        </div>
        <div>
          <h3 data-testid={ `seller_orders__element-card-price-${item.id}` }>
            { `R$: ${item.totalPrice.replace('.', ',')}` }
          </h3>
        </div>
        <h4 data-testid={ `seller_orders__element-card-address-${item.id}` }>
          { `${item.deliveryAddress}, ${item.deliveryNumber}` }
        </h4>
      </div>
    </Link>
  );
}

CardSeller.propTypes = {
  item: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default CardSeller;
