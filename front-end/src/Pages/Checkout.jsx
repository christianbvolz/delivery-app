import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { saleProductsRelatedRequests, SellersRelatedRequests } from '../Services/request';
import Navegacao from '../Components/Atoms/Navegacao';
import Table from '../Components/Atoms/Table';
import CheckoutForm from '../Components/Atoms/CheckoutForm';

function Checkout() {
  const history = useHistory();
  const [cartCheckout, setCartCheckout] = useState([]);
  const [deliveryAdress, setDeliveryAdress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellers, setSellers] = useState([{ name: 'Fulana Pereira' }]);
  const [selectedSeller, setSelectedSeller] = useState(2);
  const totalPrice = cartCheckout.reduce((acc, curr) => acc
      + parseFloat(curr.price * curr.quantity), 0).toFixed(2);

  const finishOrder = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const order = cartCheckout.map(({ id, quantity }) => ({ id, quantity }));
      const result = await saleProductsRelatedRequests(
        '/order/create',
        {
          order,
          sellerId: selectedSeller,
          totalPrice,
          deliveryAdress,
          deliveryNumber,
        },
        token,
      );
      localStorage.removeItem('cart');
      console.log(result);
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
    localStorage.setItem('cart', JSON.stringify(newCartCheckout));
    setCartCheckout(newCartCheckout);
  };

  useEffect(() => {
    const cartLocalStorage = JSON.parse(localStorage.getItem('cart'));
    if (cartLocalStorage) setCartCheckout(cartLocalStorage);
    getSellers();
  }, []);

  return (
    <div>
      <Navegacao />
      <Table
        products={ cartCheckout }
        removeProduct={ removeProduct }
        testId="customer_checkout"
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

export default Checkout;
