import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';

export default function TableCheckout({ cartCheckout, removeProduct }) {
  return (
    <table>
      <thead>
        <tr>
          <th key="Item">Item</th>
          <th key="Descrição">Descrição</th>
          <th key="Quantidade">Quantidade</th>
          <th key="Valor Unitário">Valor Unitário</th>
          <th key="Sub-total">Sub-total</th>
          <th key="Remover item">Remover item</th>
        </tr>
      </thead>
      <tbody>
        { cartCheckout.map((product, index) => (
          <TableRow
            key={ product.name }
            product={ product }
            cartIndex={ index }
            removeProduct={ removeProduct }
          />
        ))}
      </tbody>
    </table>
  );
}

TableCheckout.propTypes = {
  cartCheckout: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  removeProduct: PropTypes.func.isRequired,
};
