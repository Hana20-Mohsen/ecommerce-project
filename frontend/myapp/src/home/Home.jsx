import React from 'react'
import styles from './Home.module.css'
import MainSlider from '../MainSlider/MainSlider'
import phone_Category from "../assets/HomePageImgs/phones/phone-Category.jpg"
import laptop_Category from"../assets/HomePageImgs/laptops/laptop-Category.jpg"
import headphone_Category from "../assets/HomePageImgs/HeadPhones/headPhoneCategory.jpg"
import camera_Category from "../assets/HomePageImgs/cameras/camers-Category.jpg"
import discound_img from "../assets/images/banner-image3.png"
import { Link } from 'react-router-dom'
import Footer from '../footer/Footer'
export default function Home() {
  return (
    <>
    <div className={`  ${styles.main} pt-2`}>
      
    <MainSlider/>
    {/* --------------------------------------start under slider --------------------------------- */}
     <div className="container  mb-5">
      <div className="row">
        <div className="col-lg-3 col-md-6 text-md-center py-2 px-4">
          <i className="fa-solid fa-cart-shopping fs-2 main-color mb-3"></i>
          <div className='text-white'>
            <h4>Free delivery</h4>
            <span>to eny place you want around the world</span>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 text-md-center p-2 px-4 ">
        <i className="fa-solid fa-tag  fs-2 main-color mb-3"></i>
          <div className='text-white'>
            <h4>Daily offers</h4>
            <span>to eny place you want around the world</span>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 text-md-center p-2 px-4">
        <i className="fa-solid fa-medal fs-2 main-color mb-3"></i>
          <div className='text-white'>
            <h4>Quality guarantee</h4>
            <span>to eny place you want around the world</span>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 text-md-center p-2 px-4">
        <i className="fa-solid fa-shield fs-2 main-color mb-3"></i>
          <div className='text-white'>
            <h4>100% secure payment</h4>
            <span>to eny place you want around the world</span>
          </div>
        </div>
      </div>
     </div>
      {/* --------------------------------------end under slider --------------------------------- */}


       {/* --------------------------------------start Category --------------------------------- */}
      <section>
        <div className="container">
          <div className="section-title overflow-hidden mb-4 main-color">
            <h3 >Categories</h3>
          </div>
          <div className="row gy-4 my-5">
            {/* phone */}
            <div className="col-lg-3 col-md-6  d-flex justify-content-center">
             <div className='w-75 text-center  py-4 cursor-pointer rounded-3 main-color-border product text-white align-content-center'>
             <img className='w-50 mb-3' src={phone_Category} alt="" />
              <h5>Phones</h5>
             </div>
            </div>


            {/*laptop  */}
            
            <div className="col-lg-3 col-md-6  d-flex justify-content-center">
             <div className='w-75 text-center  cursor-pointer rounded-3 main-color-border product text-white align-content-center'>
             <img className='w-75  mb-3' src={laptop_Category} alt="" />
              <h5>Laptop</h5>
             </div>
            </div>


            {/* head phones */}
            
            <div className="col-lg-3 col-md-6  d-flex justify-content-center">
             <div className='w-75 text-center cursor-pointer rounded-3 main-color-border product text-white align-content-center'>
             <img className='w-50 mb-3' src={headphone_Category} alt="" />
              <h5>Phones</h5>
             </div>
            </div>


            {/* camera */}
            
            <div className="col-lg-3 col-md-6  d-flex justify-content-center">
             <div className='w-75 text-center  cursor-pointer rounded-3 main-color-border product text-white align-content-center'>
             <img className='w-50 mb-3' src={camera_Category} alt="" />
              <h5>Phones</h5>
             </div>
            </div>
          </div>
        </div>
      </section>
       {/* --------------------------------------end Category --------------------------------- */}



       {/* --------------------------------------start best seller --------------------------------- */}




        {/* --------------------------------------end best seller --------------------------------- */}



         {/* --------------------------------------start discound --------------------------------- */}
         <div className='mt-5 mainSlider_bg py-4 '>
        <div className="container">
        <div className="row  gx-5">
            {/* fisrt col */}
            <div className="col-md-6">
              <img className='w-100' src={discound_img } alt="apple collection" />
            </div>
            {/* second col */}
            
            <div className="col-md-5 text-white align-content-center">
            <h2 className=' fs-1'><span className='main-color'>30%</span> Discount on apple collection</h2>
            <span className=' fs-6'>
              Harry Up And Book This Offer
            </span>
            <Link className='btn  d-block bg-main mt-5'>Shop Collection</Link>
            </div>
          </div>
        </div>
         </div>

          {/* --------------------------------------end discound--------------------------------- */}
          {/*---------------------------------- start footer --------------------------------------------*/}
          <Footer/>

    </div>
    </>
  )
}
