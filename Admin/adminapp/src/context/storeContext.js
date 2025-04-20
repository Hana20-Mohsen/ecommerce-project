import axios from "axios";
import { createContext, useState } from "react";


export  let storeContext=createContext(0)

// function add to cart
function addToCart(productId){
   return axios.post('cart' ,{productId},{
    headers:{
      token:localStorage.getItem('token')
    }
   })
  .then(({data})=>data).catch(err => err)
}


// function get items form cart
 async function getCart(){
  return axios.get( 'cart',{
   headers:{
     token:localStorage.getItem('token')
   }
  }).then(({data})=>data).catch(err => err)
}



// function Remove from cart
 async function reomveCartItem(productId){
  return axios.delete('cart/' + productId,{
   headers:{
     token:localStorage.getItem('token')
   }
  })
 .then(({data})=>data).catch(err => err)
}


// function Update Quantity
async function UpdateQuantity(productId , count){
  return axios.put('cart/' + productId,{count} ,{
   headers:{
     token:localStorage.getItem('token')
   }
  })
 .then(({data})=>data).catch(err => err)
}


// function to place order
async function Pay(cartId , shippingAddress){
  return axios.post( 'orders/checkout-session/' + cartId,{shippingAddress} ,{
   headers:{
     token:localStorage.getItem('token')
   }
  })
 .then(({data})=>data).catch(err => err)
}




// function Delete cart
async function deleteCart(){
  return axios.delete( 'cart',{
   headers:{
     token:localStorage.getItem('token')
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