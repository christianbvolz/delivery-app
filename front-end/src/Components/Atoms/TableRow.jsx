import React from 'react';
import PropTypes from 'prop-types';
import { ButtonOnClick } from '.';

export default function TableRow({ product, cartIndex, removeProduct }) {
  const subTotal = product.price * product.quantity;
  return (
    <tr key={ product.name }>
      <td>{ cartIndex }</td>
      <td>{ product.name }</td>
      <td>{ product.quantity }</td>
      <td>{ product.price }</td>
      <td>{ subTotal.toFixed(2) }</td>
      <td>
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
  product: PropTypes.objectOf.isRequired,
  removeProduct: PropTypes.func.isRequired,
  cartIndex: PropTypes.number.isRequired,
};
