import React, { useEffect, useState } from 'react';
import Navegacao from '../Components/Atoms/Navegacao';
import { ProductsRelatedRequests } from '../Services/request';
import { ButtonOnClick, PriceTotal } from '../Components/Atoms';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qtdProduto, setQtdProduto] = useState(0);
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
          products.map((item) => (
            <div key={ item.id } className="border border-warning rounded m-2 p-3">
              <p
                data-testid={ `customer_products__element-card-price${item.id}` }
              >
                { item.price }
              </p>
              <img
                src={ item.urlImage }
                alt={ item.name }
                data-testid={ `customer_products__img-card-bg-image-${item.id}` }
              />
              <div>
                <p
                  data-testid={ `customer_products__element-card-title-${item.id}` }
                >
                  { item.name }
                </p>

                <ButtonOnClick
                  testid={ `customer_products__button-card-rm-item-${item.id}` }
                  disabled={ false }
                  onClick={ () => {
                    if (qtdProduto > 0) {
                      const numero = myCar.indexOf(item);
                      myCar.splice(numero, 1);
                      setQtdProduto(qtdProduto - 1);
                      console.log(myCar);
                    }
                  } }
                >
                  -
                </ButtonOnClick>

                <p
                  data-testid={ `customer_products__input-card-quantity-${item.id}` }
                >
                  { qtdProduto }
                </p>

                <ButtonOnClick
                  testid={ `customer_products__button-card-add-item-${item.id}` }
                  disabled={ false }
                  onClick={ () => {
                    setMyCar([...myCar, item]);
                    setQtdProduto(qtdProduto + 1);
                    console.log(myCar);
                  } }
                >
                  +
                </ButtonOnClick>
              </div>
            </div>
          ))
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
