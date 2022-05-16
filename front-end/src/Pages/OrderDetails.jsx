import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Table from '../Components/Atoms/Table';
import Navegacao from '../Components/Atoms/Navegacao';
import { ButtonOnClick } from '../Components/Atoms';
import {
  OrderDetailsRelatedRequests,
  setDeliveryStatusRelatedRequests,
} from '../Services/request';

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
    return [
      newDate.getDate(),
      newDate.getMonth() + 1,
      newDate.getFullYear(),
    ].join('/');
  }

  const setDeliveryStatus = async () => {
    try {
      const endPoint = `/orders/${saleId}`;
      if (!JSON.parse(localStorage.getItem('user')).token) return history.push('/login');
      const { token } = JSON.parse(localStorage.getItem('user'));
      const status = await setDeliveryStatusRelatedRequests(endPoint, token);
      console.log(status);
      setOrderDetails({ ...orderDetails, status: 'entregue' });
    } catch (error) {
      console.log({ error: error.response.data.message });
      console.log(error);
    }
  };

  const fetchOrderDetails = async () => {
    try {
      const endPoint = `/orders/${saleId}`;
      if (!JSON.parse(localStorage.getItem('user')).token) return history.push('/login');
      const { token } = JSON.parse(localStorage.getItem('user'));
      const order = await OrderDetailsRelatedRequests(endPoint, token);
      console.log(order);
      setOrderDetails(order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

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
          { `P. vend: id:${orderDetails.sellerId}(request?)`}
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
          disabled={ false }
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
