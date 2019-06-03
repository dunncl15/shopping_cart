import React from 'react';

const CartItem = ({
  id,
  cost,
  thumbnail_url,
  title,
  description,
  quantity,
  updateQuantity,
}) => {
  const formatDesc = description => {
    return description.slice(0, 1).toUpperCase() + description.slice(1) + '.';
  };
  return (
    <li key={id}>
      <img src={thumbnail_url} alt="" />
      <h3>{title}</h3>
      <p>{formatDesc(description)}</p>
      <div className="qty">
        Qty: {quantity}
        <div className="qty-icons">
          <button
            onClick={() => updateQuantity({ id, quantity: quantity + 1 })}
          >
            <i className="fas fa-caret-up" />
          </button>
          <button
            disabled={quantity === 1}
            onClick={() => updateQuantity({ id, quantity: quantity - 1 })}
          >
            <i className="fas fa-caret-down" />
          </button>
        </div>
      </div>
      <span className="cost">{`$${cost * quantity}.00`}</span>
    </li>
  );
};

export default CartItem;
