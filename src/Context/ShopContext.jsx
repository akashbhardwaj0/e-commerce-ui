import React, { createContext, useEffect, useState } from "react";
// import all_product from '../Components/Assets/all_product.js'

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {}
    for (let index = 0; index < 300+1; index++) {
     cart[index] = 0;
    }
    return cart
}


const ShopContextProvider = (props)=>{
    const [cartItems, setCartItems] = useState(getDefaultCart())
    const[all_product, setAll_Product] = useState([]);

    if(localStorage.getItem('auth-token')){
         const url = "http://localhost:4000/getcart"
         fetch(url,{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:""
        }).then((response)=>response.json()).then((data)=>setCartItems(data))
    }

    useEffect (()=>{
        const url = "http://localhost:4000/allproducts"
        fetch(url).then((response)=>response.json()).then((data)=>setAll_Product(data))
    },[])

    const addToCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            const url = "http://localhost:4000/addtocart"
            fetch(url,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({'itemID':itemId})
            }).then((response)=>response.json()).then((data)=>console.log('cart data', data))
        }
    }
    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            const url = "http://localhost:4000/removefromcart"
            fetch(url,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({'itemID':itemId})
            }).then((response)=>response.json()).then((data)=>console.log('cart data', data))
        }
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for (const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id === Number(item));
                 totalAmount += itemInfo.new_price * cartItems[item];
            }
            
        }    
        return totalAmount;
    }
    const getTotalCartItems = ()=>{
        let totalItems = 0;
        for(const item in cartItems)
        {
            if (cartItems[item]>0)
            {
                totalItems += cartItems[item]
            }
            
        }
        return totalItems;
    }

    const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart}
   
    return(
        <ShopContext.Provider value ={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider