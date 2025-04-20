import axios from "axios";
import { createContext, useState } from "react";
import { baseURL } from "../utiles/baseUrl";




export  let WishListContext=createContext(0)

// function add product to Wish list
   async function  addToWishList(productId){
      return axios.post(`http://localhost:3000/api/v1/wishlist/add/${productId}`,{},{
            headers:{
                authorization:`Bearer ${localStorage.getItem('token')}`,
            }
        }).then(({data})=>data).catch(err => err)
    }


    // function get product from Wish list

   async function getFromWishList(){
        return axios.get('http://localhost:3000/api/v1/wishlist/byUser',{
              headers:{
                authorization:`Bearer ${localStorage.getItem('token')}`,
              }
          }).then(({data})=>data).catch(err => err)
      }
  


      // function remove from Wish list
   async function removeWishItem(productId){
        return axios.delete(`http://localhost:3000/api/v1/wishlist/delete/${productId}`,{
              headers:{
                authorization:`Bearer ${localStorage.getItem('token')}`,
              }
          }).then(({data})=>data).catch(err => err)
      }

 export default  function WishListContextProvider({children}){
    let [WCounter , setWCounter]=useState(0)
    return <WishListContext.Provider value={{WCounter 
        , setWCounter,
         addToWishList ,
         getFromWishList ,
         removeWishItem
    }}>
        {children}

    </WishListContext.Provider>
}