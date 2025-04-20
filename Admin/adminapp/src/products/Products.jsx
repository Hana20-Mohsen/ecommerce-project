import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import Product from '../product/Product';
import { useQuery } from 'react-query';
import { productContext } from '../context/ProductContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Products() {

  let{ getProducts, reomveProductItem} =useContext(productContext)
  const [productsItems, setProductItems] = useState([])

  //-----------------------------  function delete product item ----------------------------------
  async function deleteProductItem(id) {
    let data = await reomveProductItem(id)
    console.log(data);
    setProductItems(data.products)
    toast.error('Product deleted successfully')
  }
 
  // let {data , isError , isLoading , isFetching}=  useQuery('getProducts' , getProducts , {
  //   cacheTime:1000
  // })

useEffect(() => {
  (async () => {
    let data = await getProducts();
    console.log(data.products);
    if(data){
      setProductItems(data.products)
}
  })()
}, []);
 


// return (
//   <div className='Dark-Color pt-5'>
   
//    <div className="container py-5">
//     <div className="row">
//    {productsItems?.map(item=>{
//     return <Product item={item} key={item._id}/>
//    })}
//     </div>
//    </div>
//   </div>
// )

  // if (isLoading) return <Loader />
  return (
    <div className='bg-blackAndGray'>
 <div className=' d-flex justify-content-between px-5 py-5'>
    <Link to="/admin"> <i className="fa-solid fa-circle-arrow-left main-color fs-2 "></i></Link>
      <Link to="/addProduct" className='un-underline'><i className="fa-solid fa-plus text-black bg-main rounded-5 p-2"></i></Link>
    </div>
      <div className="container main-color-border p-3">
     
        {productsItems?.map(item => {
         return  <div key={item._id} className="row border-bottom py-2">
          <div className="col-md-1">
          <img className='w-100' src={item.images[0]} alt="" />
          </div>
          <div className="col md-11 d-flex justify-content-between align-items-center">
          <div className='px-4'>
                <h5>{item.name}</h5>
                <p className=' fs-6 main-color m-0'> Price: {item.price} EGP</p>
              </div>
              <div>
                <button onClick={()=>{
                  deleteProductItem(item._id)
                }} className='btn bg-main'>Remove</button>
              </div>
          </div>
          </div>
        })}

      </div>
    </div>
  )
}
