import React from 'react';
import '../Cart.scss';

const CartFooter = ({ products }) => {
  const total = products.reduce((acc, { cost, quantity }) => {
    acc += cost * quantity;
    return acc;
  }, 0);
  return <footer>Total: {`$${total}.00`}</footer>;
};

export default CartFooter;
