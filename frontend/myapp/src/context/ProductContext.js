import React from 'react'
import { createContext, useState } from "react";
import { baseURL } from "../utiles/baseUrl";
import axios from "axios";

export  let productContext=createContext(0)
async function getByIds(ids){
  return axios.post('http://localhost:3000/api/v1/product/getByIds',{ids},{
    }).then(({data})=>data).catch(err => err)
}
export default  function ProductContextProvider({children}){
  return <productContext.Provider
  value={{
    getByIds
     }}>
     {children}

 </productContext.Provider>
}