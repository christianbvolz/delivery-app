import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ButtonOnClick from './ButtonOnClick';
import { updateCart as updateCartAction } from '../../Redux/Actions';

const NOT_FOUND = -1;
function Card({ item, cart, updateCart }) {
  return (
    <div key={ item.id } className="border border-warning rounded m-2 p-3">
      <p
        data-testid={ `customer_products__element-card-price${item.id}` }
      >
        { item.price }
      </p>
      <img
        src={ item.urlImage }
        alt={ item.name }
        data-testid={ `customer_products__img-card-bg-image-${item.id}` }
      />
      <div>
        <p
          data-testid={ `customer_products__element-card-title-${item.id}` }
        >
          { item.name }
        </p>

        <ButtonOnClick
          testid={ `customer_products__button-card-rm-item-${item.id}` }
          disabled={ false }
          onClick={ () => {
            const index = cart.indexOf(item);
            if (index === NOT_FOUND) {
              cart[index].quantity -= 1;
              if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
              }
            }
            updateCart(cart);
          } }
        >
          -
        </ButtonOnClick>

        <p
          data-testid={ `customer_products__input-card-quantity-${item.id}` }
        >
          { cart
          && cart.find((element) => element.id === item.id)
          && cart.find((element) => element.id === item.id).quantity }
        </p>

        <ButtonOnClick
          testid={ `customer_products__button-card-add-item-${item.id}` }
          disabled={ false }
          onClick={ () => {
            const index = cart.indexOf(item);
            if (index === NOT_FOUND) {
              item.quantity = 1;
              cart.push(item);
            } else {
              cart[index].quantity += 1;
            }
            updateCart(cart);
          } }
        >
          +
        </ButtonOnClick>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateCart: (cart) => dispatch(updateCartAction(cart)),
});

Card.propTypes = {
  item: PropTypes.objectOf.isRequired,
  cart: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  updateCart: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Card);
