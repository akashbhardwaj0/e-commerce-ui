import React, { createContext, useEffect, useState } from "react";
// import Api from "../Api/Api";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [all_product, setAll_Product] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            const url = `${process.env.REACT_APP_SERVER_BASE_URL}/getcart`
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setCartItems(data))
            .catch((error) => console.error('Fetch error:', error));
        }
    }, []);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/allproducts`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setAll_Product(data))
            .catch((error) => console.error('Fetch error:', error));
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/addToCart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                },
                body: JSON.stringify({ 'itemID': itemId }),
            })
            .then((response) => response.json())
            .then((data) => console.log('cart data', data))
            .catch((error) => console.error('Fetch error:', error));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/removeFromCart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                },
                body: JSON.stringify({ 'itemID': itemId }),
            })
            .then((response) => response.json())
            .then((data) => console.log('cart data', data))
            .catch((error) => console.error('Fetch error:', error));
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo && itemInfo.new_price) { // Check if itemInfo is defined and has new_price
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };
    

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    };

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
