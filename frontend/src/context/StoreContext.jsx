import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        // frontend logic
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        // backend logic
        if (token) {
            await axios.post(url+"/api/cart/add", {itemId}, {headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        // frontend logic
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        // backend logic
        if (token) {
            await axios.post(url+'/api/cart/remove', {itemId}, {headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalAmount += cartItems[item] * food_list.find(product => product._id === item).price
            }
        }
        return totalAmount;
    }

    const fetchFoodList= async () => {
        const response = await axios.get(url + '/api/food/list');
        // setFoodList(response.data.data)
        setFoodList(...Object.values(response.data.data))   
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+'/api/cart/get', {}, {headers:{token}})
        setCartItems(response.data.cartData)
    }

    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems])


    
    useEffect(() => {   
        async function loadData() {
            await fetchFoodList()
            
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));  // fixing the logout on reload
                await loadCartData(localStorage.getItem("token"))  // reloading data from the database when user is logged in and show in frontend
            }
        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
