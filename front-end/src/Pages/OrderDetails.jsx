import React from 'react';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>OrderDetails</h1>
      <h1>{ id }</h1>
    </div>
  );
};

export default OrderDetails;
