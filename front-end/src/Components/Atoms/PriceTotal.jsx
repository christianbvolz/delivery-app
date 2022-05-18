import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { useHistory } from 'react-router-dom';
import ButtonOnClick from './ButtonOnClick';

function PriceTotal({ totalPrice }) {
  const history = useHistory();
  const routeChange = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    const path = '/customer/checkout';
    history.push(path);
  };

  return (
    <div>
      <ButtonOnClick
        testid="customer_products__button-cart"
        disabled={ totalPrice === '0.00' }
        onClick={ routeChange }
      >
        Ver Carrinho: R$
        <span data-testid="customer_products__checkout-bottom-value">
          { totalPrice.replace('.', ',') }
        </span>
      </ButtonOnClick>
    </div>
  );
}

const mapStateToProps = (state) => ({
  totalPrice: state.cart.totalPrice,
});

PriceTotal.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(PriceTotal);
