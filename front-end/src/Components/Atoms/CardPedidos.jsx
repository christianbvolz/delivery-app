import React from 'react';
import PropTypes from 'prop-types';

import '../../Style/Card.css';

function CardPedidos({ item }) {
  return (
    <div className="d-flex flex-row justify-content-between card m-2 me-4 p-2">
      <div className="">
        pedido:
        { item.id }
      </div>
      <div>
        { item.status }
      </div>
      <div>
        <div>
          { item.saleDate }
        </div>
        <div>
          R$:
          { item.totalPrice.toFixed(2) }
        </div>
      </div>
    </div>
  );
}

CardPedidos.propTypes = {
  item: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default CardPedidos;
