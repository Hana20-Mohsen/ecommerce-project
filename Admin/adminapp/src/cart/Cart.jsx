import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../context/storeContext'
import Loader from '../Loader/Loader'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function Cart() {

  // get cart context
  let { getCart , reomveCartItem , setCounter , UpdateQuantity , deleteCart} = useContext(storeContext)
  let [Loading , setLoading]=useState(true)

  const [cartItems, setCartItems] = useState(null)

// function to delete item from cart

 async  function deleteCartItem(id){
  let data =await reomveCartItem(id)
  console.log(data);
  if(data.status=='success'){
    setCartItems(data)
    setCounter(data.numOfCartItems)
    toast.error('Product deleted successfully')
  }
}

// function to Update item from cart

async  function UpdateProductQuantity(id , count){
  let updatedData =await UpdateQuantity(id , count)
  console.log(updatedData);
  if(updatedData.status=='success'){
    setCartItems(updatedData)
    setCounter(updatedData.numOfCartItems)
    toast.success('Product Updated successfully')
  }
}


// function to delete my cart

async  function deleteMyCart(){
  let data =await deleteCart()
  console.log(data);
  if(data.message=='success'){
    setCartItems(null)
    setCounter(0)
    toast.error('Cart Deleted successfully')
  }
}


  // call get cart item function
  useEffect(() => {
    (async () => {
      let data = await getCart()
      if(data?.response?.data.statusMsg=='fail'){
       setCartItems(null)
      }
      else{
        setCartItems(data)
      }
      console.log(data);
      // if (data.status == 'success') {
      //   setCartItems(data)
        setLoading(false)
      // }

    })()
  }, [])
  if(Loading) return <Loader/>
  if(cartItems==null) return <EmptyCart/>
  if(cartItems.numOfCartItems==0)return <EmptyCart/>

  return (
    <div className='Dark-Color text-white py-5'>
         <div className=' my-4 pt-4 position-fixed ms-5'>
        <Link to="/products"> <i className="fa-solid fa-circle-arrow-left main-color fs-2 "></i></Link>
      </div>
      <div className="container my-5 mainSlider_bg py-3">
        <h2>Shop Cart :</h2>
        <p className='main-color'>Total Cart Price : {cartItems?.data?.totalCartPrice} EGP</p>
        {cartItems?.data?.products.map((item) =>{
       return   <div key={item._id} className="row border-bottom py-2">
            <div className="col-md-1">
              <img className='w-100' src={item.product.imageCover} alt="" />
            </div>
            <div className="col-md-11 d-flex justify-content-between align-items-center">
              <div>
                <h5>{item.product.title}</h5>
                <p className=' fs-6 main-color m-0'> Price: {item.price} EGP</p>
                <button onClick={()=>{
                  deleteCartItem(item.product._id)
                }} className='btn m-0 p-0 mt-2 text-white'> <i className="fa-solid fa-trash-can main-color "></i> Remove</button>
              </div>
              <div className='px-5 d-flex justify-content-between' >
               <button disabled={item.count>=item.product.quantity} onClick={()=>[
                UpdateProductQuantity(item.product._id, item.count+1 )
               ]} className='btn main-color-border text-white'>+</button>
              <span className=' fs-5 mx-2'> {item.count}</span>
               <button disabled={item.count<=1} onClick={()=>{
                 UpdateProductQuantity(item.product._id, item.count-1 )
               }} className='btn main-color-border text-white'>-</button>
              </div>
            </div>
          </div>
        })}

    {/* order button */}
    <Link to={`/address/${cartItems.data._id}`}  className='btn text-white bg-main my-3'>Place Order</Link >
    <button className='btn bg-main text-white ms-5' onClick={()=>{
      deleteMyCart()
    }}>Resst cart</button>
      </div>
     
    </div>
  )
}
