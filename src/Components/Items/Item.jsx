import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const { id, image, name, new_price, old_price } = props;
  return (
    <div className='item'>
      <Link to={`/product/${id}`}>
        <img src={image} alt="" onClick={() => window.scroll(0, 0)} />
      </Link>
      <p>{name}</p>
      <div className="item-price">
        <div className="item-price-new">
          ${new_price}
        </div>
        <div className="item-price-old">
          ${old_price}
        </div>
      </div>
    </div>
  );
}

export default Item;
