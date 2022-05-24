import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Table from '../Components/Atoms/Table';
import NavSellerAndAdm from '../Components/Atoms/NavSallerAndAdm';
import { ButtonOnClick } from '../Components/Atoms';
import { getRequests, setStatusRequests } from '../Services/request';

const SellerOrderDetails = () => {
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

  const setDeliveryStatus = async ({ target: { innerHTML: btnAction } }) => {
    try {
      const endPoint = `/orders/${saleId}`;
      if (!JSON.parse(localStorage.getItem('user')).token) return history.push('/login');
      const { token } = JSON.parse(localStorage.getItem('user'));
      const status = btnAction.includes('pedido')
        ? 'Preparando pedido' : 'Em Trânsito';
      await setStatusRequests(endPoint, { status }, token);
      setOrderDetails({ ...orderDetails, status });
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
      <NavSellerAndAdm />
      <div>
        <h3
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          { `pedido ${saleId}`}
        </h3>
        <h3
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          { formatDate(orderDetails.saleDate) }
        </h3>
        <h3
          data-testid={ 'seller_order_details__'
          + 'element-order-details-label-delivery-status' }
        >
          { orderDetails.status }
        </h3>
        <ButtonOnClick
          disabled={ orderDetails.status !== 'Pendente' }
          testid="seller_order_details__button-preparing-check"
          onClick={ (e) => setDeliveryStatus(e) }
        >
          Preparar pedido
        </ButtonOnClick>
        <ButtonOnClick
          disabled={ orderDetails.status !== 'Preparando pedido' }
          testid="seller_order_details__button-dispatch-check"
          onClick={ (e) => setDeliveryStatus(e) }
        >
          Saiu para entrega
        </ButtonOnClick>
      </div>
      <Table
        products={ orderDetails.products }
        testId="seller_order_details"
      />
      <h1
        data-testid="seller_order_details__element-order-total-price"
      >
        { `Total: R$ ${orderDetails.totalPrice.replace('.', ',')}` }
      </h1>
    </div>
  );
};

export default SellerOrderDetails;
