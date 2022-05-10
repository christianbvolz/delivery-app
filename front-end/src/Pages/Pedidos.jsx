import React, { useState, useEffect } from 'react';
import { CardPedidos } from '../Components/Atoms';
import Navegacao from '../Components/Atoms/Navegacao';
// import { ProductsRelatedRequests } from '../Services/request';

function Pedidos() {
  const [loading, setLoading] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const requestedData = async () => {
    setLoading(true);
    // const data = await ProductsRelatedRequests('/orders');
    // MOCANDO O RESULTADO DO BACK END
    const dataMock = [
      {
        id: 1,
        userId: 3,
        sellerId: 3,
        totalPrice: 1240,
        deliveryAdress: 'Rua de teste',
        deliveryNumber: '233',
        saleDate: '2022-05-10',
        status: 'Preparando',
      },
      {
        id: 2,
        userId: 3,
        sellerId: 3,
        totalPrice: 120,
        deliveryAdress: 'Rua de teste',
        deliveryNumber: '233',
        saleDate: '2022-05-10',
        status: 'Preparando',
      },
    ];
    setPedidos(dataMock);
    // setPedidos(data);
    setLoading(false);
  };

  useEffect(() => {
    requestedData();
  }, []);

  return (
    <div>
      <Navegacao />
      <div>
        { loading && <p>Carregando...</p> }
        {
          pedidos.length === 0
            ? <p>Nenhum pedido encontrado</p>
            : pedidos.map((item) => <CardPedidos key={ item.id } item={ item } />)
        }
      </div>
    </div>
  );
}

export default Pedidos;
