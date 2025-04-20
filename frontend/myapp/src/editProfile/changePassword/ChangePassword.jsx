import React from 'react'
import { Link } from 'react-router-dom'

export default function ChangePassword() {
  return (
    <div className='bg-grad mt-5 pt-5 text-white'>
           <Link to="/editprofile"> <i className="fa-solid fa-circle-arrow-left main-color fs-2 ms-3 "></i></Link>
      <h2>i am in change password</h2>
    </div>
  )
}
