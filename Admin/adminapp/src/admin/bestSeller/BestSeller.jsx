import React from 'react'
import { Link } from 'react-router-dom'

export default function BestSeller() {
  return (
    <>
       <div className=' mt-5 pt-5 bg-grad text-white'>
      <Link to="/admin"> <i className="fa-solid fa-circle-arrow-left main-color fs-2 "></i></Link>
        <h2>
            Best sellet


        </h2>


   <input type='text' placeholder='enter your name ' > </input>


      </div>
    </>
  )
}
