import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ButtonOnClick from './ButtonOnClick';

function Card({ item }) {
  const [qtdProduto, setQtdProduto] = useState(0);
  const [myCar, setMyCar] = useState([]);

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
            if (qtdProduto > 0) {
              const numero = myCar.indexOf(item);
              myCar.splice(numero, 1);
              setQtdProduto(qtdProduto - 1);
            }
          } }
        >
          -
        </ButtonOnClick>

        <p
          data-testid={ `customer_products__input-card-quantity-${item.id}` }
        >
          { qtdProduto }
        </p>

        <ButtonOnClick
          testid={ `customer_products__button-card-add-item-${item.id}` }
          disabled={ false }
          onClick={ () => {
            setMyCar([...myCar, item]);
            setQtdProduto(qtdProduto + 1);
            console.log(myCar);
          } }
        >
          +
        </ButtonOnClick>
      </div>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};
export default Card;
