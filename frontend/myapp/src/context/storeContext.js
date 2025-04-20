import axios from "axios";
import { createContext, useState } from "react";
import { baseURL } from "../utiles/baseUrl";


export  let storeContext=createContext(0)

// function add to cart
async function addToCart(productId , quantity=1){
   return axios.post(`http://localhost:3000/api/v1/cart/add/${productId}` ,{quantity},{
    headers:{
      authorization:`Bearer ${localStorage.getItem('token')}`
    }
   })
  .then(({data})=>data).catch(err => err)
}


// function get items form cart
 async function getCart(){
  return axios.get('http://localhost:3000/api/v1/cart/all',{
   headers:{
     authorization:`Bearer ${localStorage.getItem('token')}`
   }
  }).then(({data})=>data).catch(err => err)
}



// function Remove from cart
 async function reomveCartItem(productId){
  return axios.delete(`http://localhost:3000/api/v1/cart/delete/${productId}` ,{
   headers:{
     authorization:`Bearer ${localStorage.getItem('token')}`
   }
  })
 .then(({data})=>data).catch(err => err)
}


// function Update Quantity
async function UpdateQuantity(productId , operation){
  return axios.put(`http://localhost:3000/api/v1/cart/update/${productId}`,{operation} ,{
   headers:{
     authorization:`Bearer ${localStorage.getItem('token')}`
   }
  })
 .then(({data})=>data).catch(err => err)
}


// function to place order
async function Pay(cartId , shippingAddress){
  return axios.post(baseURL + 'orders/checkout-session/' + cartId,{shippingAddress} ,{
   headers:{
     token:localStorage.getItem('token')
   }
  })
 .then(({data})=>data).catch(err => err)
}




// function Delete cart
async function deleteCart(){
  return axios.delete('http://localhost:3000/api/v1/cart/reset',{
   headers:{
     authorization:`Bearer ${localStorage.getItem('token')}`
   }
  })
 .then(({data})=>data).catch(err => err)
}

 export default  function StoreContextProvider({children}){

    const [Counter , setCounter]=useState(0)
    return <storeContext.Provider
     value={{Counter, 
        setCounter ,
        addToCart ,
        getCart ,
        reomveCartItem ,
        UpdateQuantity ,
        Pay ,
        deleteCart,
        }}>
        {children}

    </storeContext.Provider>
}