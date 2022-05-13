import React, { useState, useEffect } from 'react';
import { CardPedidos } from '../Components/Atoms';
import Navegacao from '../Components/Atoms/Navegacao';
import { SalesRelatedRequests } from '../Services/request';

function VendedorPedidos() {
  const [loading, setLoading] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const requestedData = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setLoading(true);
    const data = await SalesRelatedRequests('/orders', token);
    setPedidos(data);
    setLoading(false);
  };

  useEffect(() => {
    requestedData();
  }, []);

  return (
    <div>
      <Navegacao />
      <div>
        vendedoooor
        { loading && <p>Carregando...</p> }
        {
          pedidos === undefined
            ? <p>Nenhum pedido encontrado</p>
            : pedidos.map((item) => <CardPedidos key={ item.id } item={ item } />)
        }
      </div>
    </div>
  );
}

export default VendedorPedidos;
