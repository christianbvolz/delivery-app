import React from 'react';
import PropTypes from 'prop-types';
import { ButtonOnClick } from '.';

export default function TableRow({ product, cartIndex, removeProduct }) {
  const subTotal = product.price * product.quantity;
  return (
    <tr key={ product.name }>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${cartIndex}` }
      >
        { cartIndex + 1 }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${cartIndex}` }
      >
        { product.name }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${cartIndex}` }
      >
        { product.quantity }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${cartIndex}` }
      >
        { product.price }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${cartIndex}` }
      >
        { subTotal.toFixed(2) }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-remove-${cartIndex}` }
      >
        <ButtonOnClick
          testid=""
          disabled={ false }
          onClick={ () => removeProduct(product.id) }
        >
          Remover item
        </ButtonOnClick>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  removeProduct: PropTypes.func.isRequired,
  cartIndex: PropTypes.number.isRequired,
};
