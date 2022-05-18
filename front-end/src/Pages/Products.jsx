import React, { useEffect, useState } from 'react';
import Navegacao from '../Components/Atoms/Navegacao';
import { ProductsRelatedRequests } from '../Services/request';
import { PriceTotal } from '../Components/Atoms';
import Card from '../Components/Atoms/Card';

function Products() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const totalPrice = cart.reduce((acc, curr) => acc
      + parseFloat(curr.price * curr.quantity), 0).toFixed(2);

  const addProductToCart = (product) => {
    const newCart = cart.filter(({ id }) => id !== product.id);
    setCart([...newCart, product]);
    localStorage.setItem('cart', JSON.stringify([...newCart, product]));
  };

  const removeProductCart = (product) => {
    const newCart = cart.filter(({ id }) => id !== product.id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const getProducts = async () => {
    const localStorageCart = JSON.parse(localStorage.getItem('cart'));
    const data = await ProductsRelatedRequests('/products');
    setProducts(data);
    setLoading(false);
    if (localStorageCart) setCart(localStorageCart);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Navegacao />
      <main className="d-flex flex-wrap justify-content-between">
        { !loading && products.map((item) => (
          <Card
            item={ item }
            key={ item.id }
            addProductToCart={ addProductToCart }
            removeProductCart={ removeProductCart }
          />
        )) }
      </main>
      <div>
        <PriceTotal
          totalPrice={ totalPrice }
        />
      </div>
    </div>
  );
}

export default Products;
