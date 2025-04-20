// import axios from 'axios'
// import React from 'react'
// import { useQuery } from 'react-query'
// import { Link } from 'react-router-dom'
// import Loader from '../../Loader/Loader'
// import Phones from './Phones'

// export default function Phone() {


//   function getProducts(){
//     return axios.get('http://localhost:3000/api/v1/product/bycategory?categories=phones')
//   }

// let {data , isError , isLoading , isFetching}=  useQuery('getProducts' , getProducts , {
//   cacheTime:1000
// })
// console.log(data?.data.productList)
// if(isLoading) return <Loader/>
//   return (
//     <div className='Dark-Color pt-3'>
     
     
//       <div className=' pt-5'>
     
//      <div className="container py-5">
//      <Link to="/Home"> <i className="fa-solid fa-circle-arrow-left main-color fs-2 "></i></Link>
//       <div className="row">
//      {data?.data.productList.map(item=>{
//       return <Phones item={item} key={item._id}/>
//      })}
//       </div>
//      </div>
//     </div>
//     </div>
//   )
// }
