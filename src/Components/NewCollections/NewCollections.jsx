import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "../Items/Item";
// import Api from "../../Api/Api"

const NewCollections = () => {
  const[new_collection, setNew_Collection] = useState([]);
  useEffect(()=>{
    // const url = "http://localhost:4000/newcollection"
    const url = `${process.env.REACT_APP_SERVER_BASE_URL}/newcollection`
    fetch(url).then((response)=>response.json()).then((data)=>setNew_Collection(data))
  },[])
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, index) => {
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