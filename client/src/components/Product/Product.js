import React from 'react';
import './Product.scss';

const Product = ({
  id,
  title,
  description,
  cost,
  rating,
  thumbnail_url,
  handleClick,
  inCart,
}) => {
  const formatDesc = () => {
    return description.slice(0, 1).toUpperCase() + description.slice(1) + '.';
  };

  const formatRating = () => {
    const stars = [
      <i key="1" className="far fa-star" />,
      <i key="2" className="far fa-star" />,
      <i key="3" className="far fa-star" />,
      <i key="4" className="far fa-star" />,
      <i key="5" className="far fa-star" />,
    ];
    if (rating > 0) stars.fill(<i className="fas fa-star" />, 0, rating - 1);
    return stars.map((star, i) => React.cloneElement(star, { key: i + 1 }));
  };

  return (
    <div className="product-card">
      <img src={thumbnail_url} alt="" />
      <h3>{title}</h3>
      <p>{formatDesc()}</p>
      <span>{`$${cost}.00`}</span>
      <div className="rating">{formatRating()}</div>
      {inCart ? (
        <span className="cart-item">
          <i className="fas fa-check-circle" /> Item in cart
        </span>
      ) : (
        <button className="add-to-cart" onClick={() => handleClick(id)}>
          <i className="fas fa-cart-plus" /> Add to cart
        </button>
      )}
    </div>
  );
};

export default Product;
