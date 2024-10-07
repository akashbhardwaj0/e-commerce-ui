import React from "react";
import "./Breadcrum.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";

const Breadcrum = (props) => {
  const { product } = props;

  // Check if product is defined
  if (!product) {
    return <div className="breadcrum">Loading...</div>; // or any placeholder
  }

  return (
    <div className="breadcrum">
      HOME <img src={arrow_icon} alt="arrow icon" /> SHOP <img src={arrow_icon} alt="arrow icon" /> {product.category} <img src={arrow_icon} alt="arrow icon" /> {product.name}
    </div>
  );
};

export default Breadcrum;
