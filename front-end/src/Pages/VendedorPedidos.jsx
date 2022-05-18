import React, { useState, useEffect } from 'react';
import { CardSeller, NavSellerAndAdm } from '../Components/Atoms';
import { SalesRelatedRequests } from '../Services/request';

function VendedorPedidos() {
  const [loading, setLoading] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const requestedData = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setLoading(true);
    const data = await SalesRelatedRequests('/seller', token);
    setPedidos(data);
    setLoading(false);
  };

  useEffect(() => {
    requestedData();
  }, []);

  return (
    <div>
      <NavSellerAndAdm />
      <div>
        { loading && <p>Carregando...</p> }
        {
          pedidos === undefined
            ? <p>Nenhum pedido encontrado</p>
            : pedidos.map((item) => <CardSeller key={ item.id } item={ item } />)
        }
      </div>
    </div>
  );
}

export default VendedorPedidos;
