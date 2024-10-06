<<<<<<< HEAD
import React from "react";
import "./NewCollections.css";
import new_collections from "../Assets/new_collections";
import Item from "../Items/Item";

const NewCollections = () => {
=======
import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "../Items/Item";
import Api from "../../Api/Api"

const NewCollections = () => {
  const[new_collection, setNew_Collection] = useState([]);
  useEffect(()=>{
    // const url = "http://localhost:4000/newcollection"
    fetch(Api.newcollection).then((response)=>response.json()).then((data)=>setNew_Collection(data))
  },[])
>>>>>>> deployment-cofig-ec2
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
<<<<<<< HEAD
        {new_collections.map((item, index) => {
=======
        {new_collection.map((item, index) => {
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

export default NewCollections;