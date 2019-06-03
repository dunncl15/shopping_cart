import React from 'react';
import CartItem from './CartItem/CartItem';
import CartFooter from './CartFooter/CartFooter';
import './Cart.scss';

const Cart = ({ products, updateQuantity }) => {
  const renderProducts = () => {
    return products.map(product => (
      <CartItem {...product} updateQuantity={updateQuantity} />
    ));
  };

  return (
    <div className="cart">
      {products.length > 0 ? (
        <ul className="cart-list">{renderProducts()}</ul>
      ) : (
        <span className="cart-empty">Cart empty</span>
      )}
      <CartFooter products={products} />
    </div>
  );
};

export default Cart;
