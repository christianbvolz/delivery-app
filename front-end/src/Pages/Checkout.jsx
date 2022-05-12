import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navegacao from '../Components/Atoms/Navegacao';
import { ButtonOnClick, Input } from '../Components/Atoms';
import { updateCart as updateCartAction } from '../Redux/Actions';
import TableRow from '../Components/Atoms/TableRow';
import { saleProductsRelatedRequests, SellersRelatedRequests } from '../Services/request';

function Checkout({ cart, updateCart }) {
  const [cartCheckout, setCartCheckout] = useState([]);
  const [deliveryAdress, setDeliveryAdress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellers, setSellers] = useState([{ name: 'Fulana Pereira' }]);
  const [selectedSeller, setSelectedSeller] = useState('Fulana Pereira');
  const [completedSale, setCompletedSale] = useState(false);
  const [saleId, setSaleId] = useState(1);
  const history = useHistory();

  const finishOrder = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const order = cartCheckout.map(({ id, quantity }) => ({ id, quantity }));
      const { id: sellerId } = sellers.find(({ name }) => name === selectedSeller);
      const totalPrice = cartCheckout.reduce((acc, curr) => acc
      + parseFloat(curr.price * curr.quantity), 0).toFixed(2);
      updateCart([...cartCheckout]);
      const result = await saleProductsRelatedRequests(
        '/order/create',
        {
          order,
          sellerId,
          totalPrice,
          deliveryAdress,
          deliveryNumber,
        },
        token,
      );
      setCompletedSale(true);
      setSaleId(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSellers = async () => {
    const allSellers = await SellersRelatedRequests('/sellers');
    setSellers(allSellers);
  };

  const removeProduct = (productId) => {
    const newCartCheckout = cartCheckout.filter(({ id }) => id !== productId);
    setCartCheckout(newCartCheckout);
  };

  const completedSaleScreen = () => (
    <div>
      <h1>Compra realizada com sucesso!</h1>
      <ButtonOnClick
        testid=""
        disabled={ false }
        onClick={ () => history.push(`/customer/orders/${saleId}`) }
      >
        Ir para detalhes do pedido
      </ButtonOnClick>
    </div>
  );

  useEffect(() => {
    setCartCheckout(cart);
    getSellers();
  }, [cart]);

  return completedSale ? completedSaleScreen() : (
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
        <select
          data-testid="cc"
          onChange={ ({ target }) => setSelectedSeller(target.value) }
          value={ selectedSeller }
        >
          {sellers.map(({ name }) => (
            <option value={ name } key={ name }>{ name }</option>
          ))}
        </select>
        <Input
          placeholder="Endereço de entrega"
          testid=""
          name="deliveryAdress"
          onChange={ ({ target }) => setDeliveryAdress(target.value) }
          value={ deliveryAdress }
          type="text"
        />
        <Input
          placeholder="Número"
          testid="1"
          name="deliveryNumber"
          onChange={ ({ target }) => setDeliveryNumber(target.value) }
          value={ deliveryNumber }
          type="number"
        />
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
