import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navegacao from '../Components/Atoms/Navegacao';
import { ButtonOnClick } from '../Components/Atoms';
import { updateCart as updateCartAction } from '../Redux/Actions';
import TableRow from '../Components/Atoms/TableRow';

function Checkout({ cart, updateCart }) {
  const [cartCheckout, setCartCheckout] = useState([]);
  const history = useHistory();

  const finishOrder = () => {
    updateCart([...cartCheckout]);
    const path = '/costumer/checkout';
    history.push(path);
  };

  useEffect(() => {
    setCartCheckout(cart);
  }, [cart]);

  const removeProduct = (productId) => {
    const newCartCheckout = cartCheckout.filter(({ id }) => id !== productId);
    setCartCheckout(newCartCheckout);
  };

  return (
    <div>
      <Navegacao />
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
              cartIndex={ index + 1 }
              removeProduct={ removeProduct }
            />
          ))}
        </tbody>
      </table>
      <div>
        <ButtonOnClick
          testid=""
          disabled={ false }
          onClick={ finishOrder }
        >
          Finalizar pedido
        </ButtonOnClick>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

const mapDispatchToProps = (dispatch) => ({
  updateCart: (cart) => dispatch(updateCartAction(cart)),
});

Checkout.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  updateCart: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
