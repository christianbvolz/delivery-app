import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Navegacao from '../Components/Atoms/Navegacao';
import { ProductsRelatedRequests } from '../Services/request';
import { PriceTotal } from '../Components/Atoms';
import Card from '../Components/Atoms/Card';

function Products({ cart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dataRelatedRequests = async () => {
    setLoading(true);
    const data = await ProductsRelatedRequests('/products');
    const dataWithQuantity = data.map((item) => ({
      ...item,
      quantity: 0,
    }));
    setProducts(dataWithQuantity);
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
          products.map((item) => <Card item={ item } key={ item.id } cart={ cart } />)
        }
        { loading && <p>Carregando...</p> }
      </main>
      <div>
        <PriceTotal cart={ cart } />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

Products.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default connect(mapStateToProps, null)(Products);
