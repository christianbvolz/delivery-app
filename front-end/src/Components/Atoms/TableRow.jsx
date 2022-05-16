import React from 'react';
import PropTypes from 'prop-types';
import { ButtonOnClick } from '.';

export default function TableRow({ product, cartIndex, removeProduct, testId }) {
  const subTotal = product.price * product.quantity;
  return (
    <tr key={ product.name }>
      <td
        data-testid={ `${testId}__element-order-table-item-number-${cartIndex}` }
      >
        { cartIndex + 1 }
      </td>
      <td
        data-testid={ `${testId}__element-order-table-name-${cartIndex}` }
      >
        { product.name }
      </td>
      <td
        data-testid={ `${testId}__element-order-table-quantity-${cartIndex}` }
      >
        { product.quantity }
      </td>
      <td
        data-testid={ `${testId}__element-order-table-unit-price-${cartIndex}` }
      >
        { product.price.replace('.', ',') }
      </td>
      <td
        data-testid={ `${testId}__element-order-table-sub-total-${cartIndex}` }
      >
        { subTotal.toFixed(2).replace('.', ',') }
      </td>
      {
        removeProduct
        && <td>
          <ButtonOnClick
            testid={ `${testId}__element-order-table-remove-${cartIndex}` }
            disabled={ false }
            onClick={ () => removeProduct(product.id) }
          >
            Remover item
          </ButtonOnClick>
        </td>
      }
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
  removeProduct: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  cartIndex: PropTypes.number.isRequired,
  testId: PropTypes.string.isRequired,
};

TableRow.defaultProps = {
  removeProduct: false,
};
