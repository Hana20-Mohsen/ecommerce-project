import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import Product from '../product/Product';
import { useQuery } from 'react-query';
export default function Products() {

 async function getProducts(){
    return axios.get('http://localhost:3000/api/v1/product/all')
  }

 let {data , isError , isLoading , isFetching}=  useQuery('getProducts' , getProducts , {
  cacheTime:1000
})

// console.log(data);

// console.log(data)
// console.log(isLoading)

//   let [Products , setProducts]=useState([])
//   let [loading, setLoading]=useState(true);
//  async function getProducts(){
//   let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products')
//   console.log(data.data)
//   setProducts(data.data)
//   setLoading(false);
//   }
//   useEffect(() =>{
//     getProducts()
//   },[]);

  if(isLoading) return <Loader/>
  return (
    <div className='Dark-Color pt-5'>
     
     <div className="container py-5">
      <div className="row">
     {data?.data?.products?.map(item=>{
      return <Product item={item} key={item._id}/>
     })}
      </div>
     </div>
    </div>
  )
}
