import React from 'react';
import Navegacao from '../Components/Atoms/Navegacao';
import { ProductsRelatedRequests } from '../Services/request';

function Pedidos() {
  const [loading, setLoading] = useState(true);
  const requestedData = async () => {
    setLoading(true);
    const data = await ProductsRelatedRequests('/orders');
    console.log('Verificando data pedido', data);
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
      </div>
    </div>
  );
}

export default Pedidos;
