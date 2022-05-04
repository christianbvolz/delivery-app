import React, { useEffect, useState } from 'react';
import Navegacao from '../Components/Atoms/Navegacao';
import { ProductsRelatedRequests } from '../Services/request';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qtdProduto, setQtdProduto] = useState(0);
  const [myCar, setMyCar] = useState([]);

  useEffect(async() => {
    setLoading(true);
    const data = await ProductsRelatedRequests('/products');
    setProducts(data);
    
    setLoading(false);
  }, []);

  const handleClick = () => {
    setMyCar([...myCar, item]);
    setQtdProduto(qtdProduto + 1)
  }

  return(
    <div>
      <Navegacao />
      <main className="d-flex flex-wrap justify-content-between">
        {
          products.map((item) => (
            <div key={ item.id } className="border border-warning rounded m-2 p-3">
              <p> { item.price } </p>
              { item.urlImage }
              <div>
                <p> { item.name } </p>
                <button onClick={handleClick}>+</button>
                <p>{ qtdProduto }</p>
              </div>
            </div>
          ))
        }
        { (loading) && <p>Carregando...</p> }
      </main>
    </div>
  );
}

export default Products;
