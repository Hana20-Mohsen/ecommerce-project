import axios from "axios";
import { createContext, useState } from "react";


export  let CategoryContext=createContext(0)


// function get Categories

 async function getCategories(){
  return axios.get('http://localhost:3000/api/v1/category/all').then(({data})=>data).catch(err => err)
}






 export default  function CategoryContextProvider({children}){
    return <CategoryContext.Provider
     value={{
        getCategories,
        }}>
        {children}

    </CategoryContext.Provider>
}