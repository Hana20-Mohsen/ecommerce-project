import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
  return (
    <>
    <div className='bg-grad mt-5 pt-5'>
    <Link to="/home"><i className="fa-solid fa-house main-color ms-5 fs-3 mt-3"></i></Link>
    <div className=' h-50  align-content-center '>
    <div className="container  ">

<div className="Gray-Color w-75 container text-white p-4">
<h2 className=' main-color'>Account Settings</h2>
 <div className="  main-color-border mt-4 p-3">
   <div className="">
   <h3>username:   <span className=' d-inline ms-3'>hana mohsen</span>  </h3> 
   </div>
   <div className="my-3">
   <h3>email:   <span className=' d-inline ms-3'>Hana2003@hmail.com</span>  </h3> 
   </div>
 <div className=' d-flex justify-content-end px-5'> <Link to="/editprofile"><button className='btn bg-main profile-btn '>Edit</button></Link></div>
 </div>
</div>
</div>
    </div>

    </div>
    </>
  )
}
