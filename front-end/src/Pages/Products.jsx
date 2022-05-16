import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Navegacao from '../Components/Atoms/Navegacao';
import { ProductsRelatedRequests } from '../Services/request';
import { PriceTotal } from '../Components/Atoms';
import Card from '../Components/Atoms/Card';
import { updateCartPrice as updateCartPriceAction } from '../Redux/Actions';

function Products({ updateCartPrice }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const calculateCartCurrPrice = (array) => array.reduce((acc, curr) => acc
    + parseFloat(curr.price * curr.quantity), 0).toFixed(2);

  const initialCartSetup = async () => {
    const onlineCart = JSON.parse(localStorage.getItem('cart'));
    const data = await ProductsRelatedRequests('/products');
    const dataWithQuantity = data.map((item) => ({
      ...item,
      quantity: 0,
    }));
    if (onlineCart?.length === dataWithQuantity.length) {
      updateCartPrice(calculateCartCurrPrice(onlineCart));
      setLoading(false);
      return setCart(onlineCart);
    }
    setCart(dataWithQuantity);
    localStorage.setItem('cart', JSON.stringify(dataWithQuantity));
    setLoading(false);
  };

  useEffect(() => {
    initialCartSetup();
  }, []);

  return (
    <div>
      <Navegacao />
      <main className="d-flex flex-wrap justify-content-between">
        { !loading && cart.map((item) => (
          <Card
            item={ item }
            key={ item.id }
            cart={ cart }
          />
        )) }
      </main>
      <div>
        <PriceTotal />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateCartPrice: (value) => dispatch(updateCartPriceAction(value)),
});

Products.propTypes = {
  updateCartPrice: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Products);
