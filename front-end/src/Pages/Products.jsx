import React, { useEffect, useState } from 'react';
import Navegacao from '../Components/Atoms/Navegacao';
import { ProductsRelatedRequests } from '../Services/request';
import { PriceTotal } from '../Components/Atoms';
import Card from '../Components/Atoms/Card';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myCar, setMyCar] = useState([]);

  const dataRelatedRequests = async () => {
    setLoading(true);
    const data = await ProductsRelatedRequests('/products');
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    dataRelatedRequests();
  }, []);

  return (
    <div>
      <Navegacao />
      <main className="d-flex flex-wrap justify-content-between">
        {
          products.map((item) => <Card item={ item } key={ item.id } />)
        }
        { (loading) && <p>Carregando...</p> }
      </main>
      <div>
        <PriceTotal arr={ myCar } />
      </div>
    </div>
  );
}

export default Products;
