import React, { useContext, useState } from 'react'
import Loader from '../../Loader/Loader'
import { storeContext } from '../../context/storeContext'
import { WishListContext } from '../../context/WishlistContext'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Phones({item}) {
    let [btnLoading , setBtnLoading]=useState(true)
    let { Counter ,setCounter , addToCart}=useContext(storeContext)
    let {addToWishList , setWCounter}= useContext(WishListContext)   
     let x = useParams()
   
     // function to get cart quantity
   
     function getCart(){
       return axios.get(`http://localhost:3000/api/v1/order/orderitems/${x.id}`)
     }
   
     let {data , isError , isLoading , isFetching}=  useQuery('getCart' , getCart , {
       cacheTime:1000
     })
     // console.log(data)
   // ---------------------------- now i am heeeeeeeeereeeeeeeeeeeeeeeee -------------------------------------------
   // add to cart function
    async function addProductToCart(userId, productId , quantity){
     setBtnLoading(false)
       let data=  await addToCart(userId, productId , quantity)
       console.log(data);
       // if(data.status=='success'){
       //   setBtnLoading(true)
       //   setCounter(data.numOfCartItems)
       //   toast.success("Product added successfully !")
       // }
    } 
   
  //  add to WishList function
   async function addProductToWishList(productId){
       let data=  await addToWishList(productId)
       console.log(data);
       if(data.status=='success'){
         setWCounter(data.data.length)
         toast.success("Product added successfully !")
       }
    } 
   
   
  return (
    <>
       <div className="col-lg-2 col-sm-4 h-10" >
      <div className="product h-10 text-white p-2 cursor-pointer rounded-3 gray-border my-3">
        {/* start link to product details */}
      <Link className='un-underline' to={'/product-details/'+item._id}>
      <img className='w-100' src={item.image}alt="" />
      {/* <span className='main-color'>{item.category.name}</span> */}
        <h5 className='my-2 fw-bold'>{item.description.split(' ').slice(0,2).join(' ')}</h5>
      
        {/* start details */}
        <div className=' d-flex justify-content-between'>
          <div>
            {item.price} EGP 
          </div>
          <div>
          <i className="fa-solid fa-star ratingColor"></i>
            {item.ratingsAverage}
          </div>
        </div>
        {/* end details */}
      </Link>
        {/* end link to product details */}
        <i className='icon-link fa-solid fa-heart ms-2 mb-3' onClick={()=>{
          addProductToWishList(item._id)
        }}></i>
        <button disabled={!btnLoading} onClick={()=> addProductToCart(item._id)} className='btn bg-main w-100 '>
          {btnLoading? ' Add To Cart' : 'Loading ...'}
         
          </button>
      </div>
    </div>
    </>
  )
}
