import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ButtonOnClick from './ButtonOnClick';

function Card({ item, addProductToCart, removeProductCart }) {
  const [quantity, setQuantity] = useState(0);

  const removeOneItem = () => {
    if (quantity > 1) {
      setQuantity(Number(quantity) - 1);
      addProductToCart({ ...item, quantity: Number(quantity) - 1 });
    } else {
      setQuantity(0);
      removeProductCart(item);
    }
  };

  const addOneItem = () => {
    setQuantity(Number(quantity) + 1);
    addProductToCart({ ...item, quantity: Number(quantity) + 1 });
  };

  const inputChangeValue = (e) => {
    if (Number(e.target.value) > 0) {
      setQuantity(Number(e.target.value));
      addProductToCart({ ...item, quantity: Number(e.target.value) });
    } else {
      setQuantity(0);
      removeProductCart(item);
    }
  };

  useEffect(() => {
    const localStorageCart = JSON.parse(localStorage.getItem('cart'));
    const itemQuantity = localStorageCart?.find(({ id }) => id === item.id);
    if (itemQuantity) setQuantity(itemQuantity.quantity);
  }, [item.id]);

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
          onClick={ removeOneItem }
        >
          -
        </ButtonOnClick>
        <input
          type="number"
          data-testid={ `customer_products__input-card-quantity-${item.id}` }
          onChange={ (e) => inputChangeValue(e) }
          value={ quantity }
        />
        <ButtonOnClick
          testid={ `customer_products__button-card-add-item-${item.id}` }
          disabled={ false }
          onClick={ () => addOneItem() }
        >
          +
        </ButtonOnClick>
      </div>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
  addProductToCart: PropTypes.func.isRequired,
  removeProductCart: PropTypes.func.isRequired,
};

export default Card;
