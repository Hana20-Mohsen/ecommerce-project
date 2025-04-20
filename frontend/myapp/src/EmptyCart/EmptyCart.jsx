import React from 'react'

import { Link } from 'react-router-dom'
export default function EmptyCart() {
  return (
   <div className='pt-4 mainSlider_bg h-100vh m-auto  d-flex justify-content-center align-items-center'>
     <div className="text-center text-white">
     <i className="fa-solid fa-face-sad-tear fs-1 mb-4  main-color"></i>
        <h1>Your Cart Is Empty</h1>
        <Link className='btn bg-main mt-3' to="/products">Shop Now</Link>
    </div>
   </div>
  )
}
