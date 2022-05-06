import PropTypes from 'prop-types';
import React from 'react';
import ButtonOnClick from './ButtonOnClick';

function PriceTotal({ cart }) {
  const somaTotal = cart.reduce((acc, curr) => acc
    + parseFloat(curr.price * curr.quantity), 0).toFixed(2);

  return (
    <div>
      <ButtonOnClick
        testid="customer_products__button-cart"
        disabled={ false }
        onClick={ () => {
          console.log('redirecionar para o carrinho');
        } }
      >
        Ver Carrinho: R$
        <span data-testid="customer_products__checkout-bottom-value">
          { somaTotal }
        </span>
      </ButtonOnClick>
    </div>
  );
}

PriceTotal.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default PriceTotal;
