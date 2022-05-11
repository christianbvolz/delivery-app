import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import ButtonOnClick from './ButtonOnClick';

function PriceTotal({ cart }) {
  const history = useHistory();
  const routeChange = () => {
    const path = '/customer/checkout';
    history.push(path);
  };

  const somaTotal = cart.reduce((acc, curr) => acc
    + parseFloat(curr.price * curr.quantity), 0).toFixed(2);
  return (
    <div>
      <ButtonOnClick
        testid="customer_products__button-cart"
        disabled={ somaTotal === '0.00' }
        onClick={ routeChange }
      >
        Ver Carrinho: R$
        <span data-testid="customer_products__checkout-bottom-value">
          { somaTotal.replace('.', ',') }
        </span>
      </ButtonOnClick>
    </div>
  );
}

PriceTotal.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default PriceTotal;
