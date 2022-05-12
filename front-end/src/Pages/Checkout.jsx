import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { updateCart as updateCartAction } from '../Redux/Actions';
import { saleProductsRelatedRequests, SellersRelatedRequests } from '../Services/request';
import Navegacao from '../Components/Atoms/Navegacao';
import TableCheckout from '../Components/Atoms/TableCheckout';
import CheckoutForm from '../Components/Atoms/CheckoutForm';

function Checkout({ cart, updateCart }) {
  const history = useHistory();
  const [cartCheckout, setCartCheckout] = useState([]);
  const [deliveryAdress, setDeliveryAdress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellers, setSellers] = useState([{ name: 'Fulana Pereira' }]);
  const [selectedSeller, setSelectedSeller] = useState('Fulana Pereira');
  const totalPrice = cartCheckout.reduce((acc, curr) => acc
      + parseFloat(curr.price * curr.quantity), 0).toFixed(2);

  const finishOrder = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const order = cartCheckout.map(({ id, quantity }) => ({ id, quantity }));
      const { id: sellerId } = sellers.find(({ name }) => name === selectedSeller);
      updateCart([]);
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
      history.push(`/customer/orders/${result.data}`);
    } catch (error) {
      console.log({ error: error.response.data.message });
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

  useEffect(() => {
    setCartCheckout(cart);
    getSellers();
  }, [cart]);

  return (
    <div>
      <Navegacao />
      <TableCheckout
        cartCheckout={ cartCheckout }
        removeProduct={ removeProduct }
      />
      <h1
        data-testid="customer_checkout__element-order-total-price"
      >
        { `Total: R$ ${totalPrice.replace('.', ',')}` }
      </h1>
      <CheckoutForm
        sellers={ sellers }
        selectedSeller={ selectedSeller }
        setSelectedSeller={ setSelectedSeller }
        deliveryAdress={ deliveryAdress }
        setDeliveryAdress={ setDeliveryAdress }
        deliveryNumber={ deliveryNumber }
        setDeliveryNumber={ setDeliveryNumber }
        finishOrder={ finishOrder }
      />
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
