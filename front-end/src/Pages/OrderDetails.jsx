import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Table from '../Components/Atoms/Table';
import Navegacao from '../Components/Atoms/Navegacao';
import { ButtonOnClick } from '../Components/Atoms';
import { getRequests, setStatusRequests } from '../Services/request';

const OrderDetails = () => {
  const history = useHistory();
  const { id: saleId } = useParams();
  const [orderDetails, setOrderDetails] = useState({
    products: [],
    totalPrice: '1.90',
    saleDate: '',
    status: 'pendente',
  });
  function formatDate(date) {
    const newDate = new Date(date);
    const NINE = 9;
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1 > NINE
      ? newDate.getMonth() + 1 : `0${newDate.getMonth() + 1}`;
    const year = newDate.getFullYear();
    return [day, month, year].join('/');
  }

  const setDeliveryStatus = async () => {
    try {
      const endPoint = `/orders/${saleId}`;
      if (!JSON.parse(localStorage.getItem('user')).token) return history.push('/login');
      const { token } = JSON.parse(localStorage.getItem('user'));
      const status = await setStatusRequests(endPoint, token);
      console.log(status);
      setOrderDetails({ ...orderDetails, status: 'entregue' });
    } catch (error) {
      console.log({ error: error.response.data.message });
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const endPoint = `/orders/${saleId}`;
        if (!JSON.parse(localStorage.getItem('user')).token) {
          return history.push('/login');
        }
        const { token } = JSON.parse(localStorage.getItem('user'));
        await getRequests(endPoint, token)
          .then((response) => setOrderDetails(response));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderDetails();
  }, [history, saleId]);

  return (
    <div>
      <Navegacao />
      <div>
        <h3
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          { `pedido ${saleId}`}
        </h3>
        <h3
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          { `P. vend: ${orderDetails.sellerName}`}
        </h3>
        <h3
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          { formatDate(orderDetails.saleDate) }
        </h3>
        <h3
          data-testid={ 'customer_order_details__'
          + 'element-order-details-label-delivery-status' }
        >
          { orderDetails.status }
        </h3>
        <ButtonOnClick
          disabled={ orderDetails.status !== 'Saiu para entrega' }
          testid="customer_order_details__button-delivery-check"
          onClick={ setDeliveryStatus }
        >
          Marcar como entregue
        </ButtonOnClick>
      </div>
      <Table
        products={ orderDetails.products }
        testId="customer_order_details"
      />
      <h1
        data-testid="customer_order_details__element-order-total-price"
      >
        { `Total: R$ ${orderDetails.totalPrice.replace('.', ',')}` }
      </h1>
    </div>
  );
};

export default OrderDetails;
