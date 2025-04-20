import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../context/storeContext'
import Loader from '../Loader/Loader'
import EmptyCart from '../EmptyCart/EmptyCart'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function Cart() {

  // get cart context
  let { getCart , reomveCartItem , setCounter , UpdateQuantity , deleteCart ,addToCart } = useContext(storeContext)
  let [Loading , setLoading]=useState(true)

  const [data, setData] = useState([])

// function to delete item from cart

 async  function deleteCartItem(id){
  let data =await reomveCartItem(id)
  // console.log(data);
  if(data.status=='success'){
    setData(data)
    setCounter(data.length)
    toast.error('Product deleted successfully')
  }
}

// function to Update item from cart

async  function UpdateProductQuantity(id , operation){
  let data =await UpdateQuantity(id , operation)
  // console.log(data);
  if(data.status=='success'){
    setData(data)
    setCounter(data.length)
    toast.success('Product Updated successfully')
  }
}


// function to delete my cart

async  function deleteMyCart(){
  let data =await deleteCart()
  // console.log(data);
  if(data.status=='success'){
    setData(null)
    setCounter(0)
    toast.error('Cart Deleted successfully')
  }
}


  // call get cart item function
  useEffect(() => {
    (async () => {
      let data = await getCart()
      // console.log(data);
      // console.log(data.cartItems);
      if(data?.status=='success'){
        setCounter(data.length)
        setData(data)
      }
     
      // if (data.status == 'success') {
      //   setCartItems(data)
        setLoading(false)
      // }

    })()
  }, [])
  if(Loading) return <Loader/>
  if(data==[]) return <EmptyCart/>
  // if(data.numOfCartItems==0)return <EmptyCart/>

  return (
    <div className='Dark-Color text-white py-5'>
         <div className=' my-4 pt-4 position-fixed ms-5'>
        <Link to="/products"> <i className="fa-solid fa-circle-arrow-left main-color fs-2 "></i></Link>
      </div>
      <div className="container my-5 mainSlider_bg py-3">
        <h2>Shop Cart :</h2>
        <p className='main-color' > Total Cart Price : {Number(data?.totalPrice || 0).toLocaleString()} EGP</p>
        {data?.cartItems?.map((item) =>{
       return   <div key={item._id} className="row border-bottom py-2">
            <div className="col-md-1">
            
              <img className='w-100' src={item.product.images[0]} alt="" />
            </div>
            <div className="col-md-11 d-flex justify-content-between align-items-center">
              <div>
                <h5>{item.product.name}</h5>
                <p className=' fs-6 main-color m-0'> Price: {item.product.price} EGP</p>
                <button onClick={()=>{
                  deleteCartItem(item.product._id)
                }} className='btn m-0 p-0 mt-2 text-white'> <i className="fa-solid fa-trash-can main-color "></i> Remove</button>
              </div>
              <div className='px-5 d-flex justify-content-between' >
               <button disabled={item.quantity>=item.product.countInStock} onClick={()=>[
                UpdateProductQuantity(item.product._id,"+" )
               ]} className='btn main-color-border text-white'>+</button>
              <span className=' fs-5 mx-2'> {item.quantity}</span>
               <button disabled={item.quantity<=1} onClick={()=>{
                 UpdateProductQuantity(item.product._id,"-" )
               }} className='btn main-color-border text-white'>-</button>
              </div>
            </div>
          </div>
        })}

    {/* order button */}
    {/* to={`/address/${cartItems.data._id}`}  */}
    <Link  className='btn text-white bg-main my-3'>Place Order</Link >
    <button className='btn bg-main text-white ms-5' onClick={()=>{
      deleteMyCart()
    }}>Reset cart</button>
      </div>
     
    </div>
  )
}
