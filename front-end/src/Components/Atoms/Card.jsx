import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { updateCartPrice as updateCartPriceAction } from '../../Redux/Actions';
import ButtonOnClick from './ButtonOnClick';

function Card({ item, cart, updateCartPrice }) {
  const [quantity, setQuantity] = useState(Number(item.quantity));

  const calculateCartCurrPrice = (array) => array.reduce((acc, curr) => acc
    + parseFloat(curr.price * curr.quantity), 0).toFixed(2);

  const updateOnlineAndParentCart = (newCart) => {
    localStorage.setItem('cart', JSON.stringify([...newCart]));
    updateCartPrice(calculateCartCurrPrice(newCart));
  };

  const removeOneItem = () => {
    if (quantity >= 1) {
      setQuantity(Number(quantity) - 1);
      cart.find((product) => item.id === product.id).quantity -= 1;
    } else {
      setQuantity(0);
      cart.find((product) => item.id === product.id).quantity = 0;
    }
  };

  const addOneItem = () => {
    setQuantity(Number(quantity) + 1);
    cart.find((product) => item.id === product.id).quantity += 1;
  };

  const inputChangeValue = (e) => {
    if (Number(e.target.value) < 0) {
      setQuantity(0);
      cart.find((product) => item.id === product.id).quantity = 0;
    } else {
      setQuantity(Number(e.target.value));
      cart.find((product) => item.id === product.id).quantity = Number(e.target.value);
    }
  };

  return (
    <div key={ item.id } className="border border-warning rounded m-2 p-3">
      <p
        data-testid={ `customer_products__element-card-price-${item.id}` }
      >
        { item.price.replace('.', ',') }
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
            removeOneItem();
            // if (quantity >= 1) {
            //   setQuantity(Number(quantity) - 1);
            // } else {
            //   setQuantity(0);
            // }
            // cart.find(item).quantity = quantity;
            // localStorage.setItem('cart', JSON.stringify([...cart]));
            updateOnlineAndParentCart(cart);
            // updateOnlineAndParentCart([...cart]);
          } }
        >
          -
        </ButtonOnClick>
        <input
          type="number"
          data-testid={ `customer_products__input-card-quantity-${item.id}` }
          onChange={ (e) => {
            inputChangeValue(e);
            // setQuantity(e.target.value);
            // if (Number(e.target.value) < 0) {
            //   setQuantity(0);
            // } else {
            //   setQuantity(Number(e.target.value));
            // }
            // const index = cart.indexOf(item);
            // if (index === NOT_FOUND) {
            //   item.quantity = Number(e.target.value);
            //   cart.push(item);
            // } else if ((Number(e.target.value) <= 0) || (e.target.value === '')) {
            //   cart.splice(index, 1);
            // } else {
            //   cart[index].quantity = Number(e.target.value);
            // }
            // cart.find(item).quantity = quantity;
            // localStorage.setItem('cart', JSON.stringify([...cart]));
            updateOnlineAndParentCart(cart);
            // updateOnlineAndParentCart([...cart]);
          } }
          value={ quantity }
        />
        <ButtonOnClick
          testid={ `customer_products__button-card-add-item-${item.id}` }
          disabled={ false }
          onClick={ () => {
            addOneItem();
            updateOnlineAndParentCart(cart);
            // updateOnlineAndParentCart([...cart]);
          } }
        >
          +
        </ButtonOnClick>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateCartPrice: (value) => dispatch(updateCartPriceAction(value)),
});

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  cart: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  updateCartPrice: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Card);
