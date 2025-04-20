import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { storeContext } from '../context/storeContext'
import { toast } from 'react-toastify'


export default function Product({item}) {

  let { Counter ,setCounter , addToCart}=useContext(storeContext)
  let [btnLoading , setBtnLoading]=useState(true)


// add to cart function
 async function addProductToCart(productId){
  setBtnLoading(false)
    let data=  await addToCart(productId)
    console.log(data);
    if(data.status=='success'){
      setBtnLoading(true)
      setCounter(data.numOfCartItems)
      toast.success("Product added successfully !")
    }
 } 


  return (
    <>
      <div className="col-lg-2 col-sm-4" >
      <div className="product text-white p-2 cursor-pointer rounded-3 gray-border my-3">
        {/* start link to product details */}
      <Link className='un-underline' to={'/product-details/'+item._id}>
      <img className='w-100' src={item.images[0]}alt="" />
      <span className='main-color'>{item.category}</span>
        <h5 className='my-2 fw-bold'>{item.description.split(' ').slice(0,2).join(' ')}</h5>
      
        {/* start details */}
        <div className=' d-flex justify-content-between'>
          <div>
            {item.price} EGP 
          </div>
          <div>
          <i className="fa-solid fa-star ratingColor"></i>
            {item.rating}
          </div>
        </div>
        {/* end details */}
      </Link>
        {/* end link to product details */}
        <i className='icon-link fa-solid fa-heart ms-2 mb-3' onClick={()=>{
          
        }}></i>
        <button disabled={!btnLoading} onClick={()=> addProductToCart(item._id)} className='btn bg-main w-100 '>
          {btnLoading? ' Add To Cart' : 'Loading ...'}
         
          </button>
      </div>
    </div>
    </>
  )
}
