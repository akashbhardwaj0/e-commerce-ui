<<<<<<< HEAD
import React from "react";
import "./Popular.css";
import data_product from "../Assets/data.js";
import Item from "../Items/Item";

const Popular = () => {
=======
import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../Items/Item";

const Popular = () => {
  const[popularProducts, setPopularProducts] = useState([]);
  useEffect(()=>{
    const url = "http://localhost:4000/populerinwomen"
    fetch(url).then((response)=>response.json()).then((data)=>setPopularProducts(data))
  },[])

>>>>>>> deployment-cofig-ec2
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
<<<<<<< HEAD
        {data_product.map((item, index) => {
=======
        {popularProducts.map((item, index) => {
>>>>>>> deployment-cofig-ec2
          return (
            <Item
              key={index}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;