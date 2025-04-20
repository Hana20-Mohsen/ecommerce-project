import React, { useContext, useEffect, useState } from 'react'
import { WishListContext} from '../context/WishlistContext';
import { productContext } from '../context/ProductContext.js';
import { storeContext } from '../context/storeContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function WishList() {

  // get wish list context
  let { getFromWishList, removeWishItem , WCounter , setWCounter,} = useContext(WishListContext)
  let {getByIds}=useContext(productContext)
  // let {getCart} = useContext(storeContext)
  // const [keyId , setKeyId]=useState('')
  const [wishListItem, setWishListItems] = useState([])


  // function to delete item from wish list

  async function deleteWishItem(id) {
    let data = await removeWishItem(id)
    if (data.status == 'success') {
      const ids = data.usersWishlistItems.map(element => element.product);
      console.log(ids);
     let response=await getByIds(ids);
     
      setWishListItems(response.products)
      setWCounter(data.length)
       toast.warning("Product deleted successfully !")
    }
  }


  // // function to get cart items

  // async function getCartItems(){
  //   let cartData =await getCart()
  //   console.log("your data from get cart = "+cartData.data.cartOwner);
  //   setKeyId(cartData.data.cartOwner)

  // }

  // call get wishlist item function
  useEffect(() => {
    (async () => {
      let data = await getFromWishList();
      if (data.status == 'success') {
        const ids = data.wishlistItems.map(element => element.product);
        console.log(ids);
       let response=await getByIds(ids);
       
        setWishListItems(response.products)
      }
    })()
  }, []);

  return (
    <div className='Dark-Color text-white py-5'>
      <div className=' my-4 pt-4 position-fixed ms-5'>
        <Link to="/products"> <i className="fa-solid fa-circle-arrow-left main-color fs-2  "></i></Link>
      </div>
      <div className="container my-5 mainSlider_bg py-3">

        <h2 className='mt-3'>Wish List :</h2>
        {wishListItem?.map((item, index) => {
          return <div key={index} className="row border-bottom py-2">
            <div className="col-md-1">
              {/* `http://localhost:3000/uploads/${}` */}
              <img className='w-100' src={item.images[0]} alt="" />
            </div>
            <div className="col-md-11 d-flex justify-content-between align-items-center">
              <div className='px-4'>
                <h5>{item.description
                }</h5>
                <p className=' fs-6 main-color m-0'> Price: {Number(item.price).toLocaleString()} EGP</p>
               
              </div>
              <div>
                <button onClick={() => {
                  deleteWishItem(item._id)
                }} className='btn m-0 p-0 mt-2 text-white d-flex justify-content-between'> <i className="fa-solid fa-trash-can main-color me-2"></i> Remove</button>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}
