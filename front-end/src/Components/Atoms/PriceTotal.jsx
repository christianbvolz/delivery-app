import PropTypes from 'prop-types';
import React from 'react';
import ButtonOnClick from './ButtonOnClick';

function PriceTotal({ arr }) {
  const somaTotal = arr.reduce((acc, curr) => {
    acc += curr.price;
    return acc;
  }, 0);

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
  arr: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default PriceTotal;
