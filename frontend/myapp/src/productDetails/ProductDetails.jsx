import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Form, Link, useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { storeContext } from '../context/storeContext'
import { WishListContext } from '../context/WishlistContext'
import { toast } from 'react-toastify'
import { useQuery } from 'react-query'
import styles from './ProductDetails.module.css'
export default function ProductDetails() {

    // add to cart

    let { Counter, setCounter, addToCart , getCart } = useContext(storeContext)
    let { WCounter, setWCounter, addToWishList ,getFromWishList} = useContext(WishListContext)
    let [btnLoading, setBtnLoading] = useState(true)
     const [isLoved, setIsLoved] = useState([]);
      const [inCart, setInCart] = useState([]);
    // const [review , setReview]=useState('')

     async function getPrevValues(){
        let data=  await getFromWishList()
        const loved = data.wishlistItems.map(element => element.product);
          setIsLoved(loved);
          // //////////////////////
      let cartItems= await getCart();
      let items=cartItems.cartItems.map(element => element.product._id);
      setInCart(items)
      
      setCounter(cartItems.length)
      }
      useEffect(() => {
        // هنا بتحطي الفانكشن اللي تشتغل مرة واحدة بس
        getPrevValues()
      }, []);
    

    // add to cart function
    async function addProductToCart(productId) {
        setBtnLoading(false)
        let data=  await addToCart(productId)
            console.log(data);
            if(data.status=='success'){
              let items=data.cartItems.map(element => element.product);
                    
                    setInCart(items)
                    setBtnLoading(true)
                    setCounter(data.length)
                    toast.success("Product added successfully !")
                  }
                  else if(data?.status=='remove'){
                    let items=data.cartItems.map(element => element.product);
                    setInCart(items)
                    setBtnLoading(true)
                    setCounter(data.length)
                    toast.error("Product deleted successfully !")
              
                  }
    }

    // add to wishlist function
    async function addProductToWishList(productId) {
        let data=  await addToWishList(productId)
            console.log(data);
            if(data.status=='success'){
        
              setWCounter(data.length)
              console.log(data.usersWishlistItems );
              const loved = data.usersWishlistItems.map(element => element.product);
              setIsLoved(loved);
              console.log(loved);
              // setIsLoved(!isLoved);
              toast.success("Product added successfully !")
            }
            else if(data.status=='deleted'){
              setWCounter(data.length)
              const loved = data.usersWishlistItems.map(element => element.product._id);
              setIsLoved(loved);
              console.log(data.usersWishlistItems);
              toast.warning("Product deleted successfully !")
        
            }
    }





    // const handleReviewChange=(event) => {
    //     setReview(event.target.value)
    // }
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    // }
    // /////////////////////////////

    let x = useParams()
    console.log(x)

    // ------------------------------ start caching --------------------------------
    async function getProduct() {
        return await axios.get(`http://localhost:3000/api/v1/product/${x.id}`)
    }
    let { data, isError, isLoading, isFetching } = useQuery('getProduct', getProduct, {
        cacheTime: 3000
    })
    console.log(data?.data?.product);
    // ------------------------------ end caching--------------------------------

    //  function to add comments
    // function addToComments(){
    //     data?.data.data.reviews=["this is my comment"]
    // }


    // function changeing start color
    let clicked = false
    const [iconColor, setIconColor] = useState('gray');
    function handelChange1() {
     if(clicked){
        setIconColor('#2ff3e0')
     }
    }

    // function handelChange2() {
    //     const newColor = iconColor === 'white' ? '#2ff3e0' : 'white';
    //     setIconColor(newColor);
    // }
    // function handelChange3() {
    //     const newColor = iconColor === 'white' ? '#2ff3e0' : 'white';
    //     setIconColor(newColor);
    // }
    // function handelChange4() {
    //     const newColor = iconColor === 'white' ? '#2ff3e0' : 'white';
    //     setIconColor(newColor);
    // }
    // function handelChange5() {
    //     const newColor = iconColor === 'white' ? '#2ff3e0' : 'white';
    //     setIconColor(newColor);
    // }



    if (isLoading) return <Loader />
    return (
        <div className='ProductDetails Dark-Color text-white h-100vh Details pt-5'>
            <div className=' my-4 pt-4 position-fixed ms-5'>
                <Link to="/products"> <i className="fa-solid fa-circle-arrow-left main-color fs-2 "></i></Link>
            </div>
            <div className="container py-5 mb-5">

                <div className="row mt-5 gx-5">
                    <div className="col-md-3 product text-white p-2 rounded-3  my-3 main-color-border">
                    
                        <img className='w-100' src={data?.data?.product.images[0]} alt="" />
                    </div>
                    <div className="col-md-9 mt-5">

                        <div className=' d-flex justify-content-between'>
                            <div>
                                <h4 className='my-2 fw-bold'>{data.data.product.name}</h4>
                            </div>
                            <div>
                                <i onClick={() => addProductToWishList(data.data.product._id)} className={`heart-icon mt-2 me-2 fs-4 icon-link fa-solid fa-heart  ${isLoved.includes(data.data.product._id) ? 'text-danger' : ''}`}></i>
                            </div>
                        </div>
                        <p className='my-3'>{data.data.product.description}</p>
                        <div className=' d-flex justify-content-between my-4'>
                            <div>
                                <span className='main-color'>{data.data.product.category}</span>
                                <div>{Number(data.data.product.price).toLocaleString()} EGP</div>
                               
                            </div>
                            <div className=' d-flex justify-content-between'>
                                {/* <svg onClick={styles.ratingColor}>
                              <i className="start fa-solid fa-star "></i>
                              </svg> */}


                                {/* <svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24 "  fill={iconColor} onClick={
                                    handelChange1()
                                }>
                                    <path stroke-width="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                                </svg>
                                <svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"  fill={iconColor} onClick={  handelChange2()}>
                                    <path stroke-width="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                                </svg>
                                <svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"   fill={iconColor} onClick={handelChange3()}>
                                    <path stroke-width="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                                </svg>
                                <svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill={iconColor} onClick={ handelChange4()}>
                                    <path stroke-width="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                                </svg>
                                <svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"   fill={iconColor} onClick={ handelChange5()}>
                                    <path stroke-width="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                                </svg> */}


                                <i   style={{color:'white'}} onChange={handelChange1 } className="fa-solid fa-star"></i>
                                <div className='ms-3'>{data.data.product.rating}</div>
                            </div>
                        </div>
                        <button disabled={!btnLoading} onClick={() => addProductToCart(data.data.product._id)} className='icon btn bg-main w-100  border-secondary '>
                        {inCart.includes(data.data.product._id) ? ' Remove item' : 'Add To Cart'}

                        </button>
                    </div>
                </div>

                <Form >

                    <label>Reviews:
                        <textarea ></textarea>
                    </label>
                    <button type='submit'>Submit Review</button>
                </Form>
            </div>
        </div>
    )
}
