import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';

export default function Table({ products, removeProduct, testId }) {
  return (
    <table>
      <thead>
        <tr>
          <th key="Item">Item</th>
          <th key="Descrição">Descrição</th>
          <th key="Quantidade">Quantidade</th>
          <th key="Valor Unitário">Valor Unitário</th>
          <th key="Sub-total">Sub-total</th>
          { removeProduct && <th key="Remover item">Remover item</th> }
        </tr>
      </thead>
      <tbody>
        { products.map((product, index) => (
          <TableRow
            key={ product.name }
            product={ product }
            cartIndex={ index }
            removeProduct={ removeProduct }
            testId={ testId }
          />
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  testId: PropTypes.string.isRequired,
  removeProduct: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

Table.defaultProps = {
  removeProduct: false,
};
