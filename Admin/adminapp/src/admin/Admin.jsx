import React from 'react'
import { Link } from 'react-router-dom'


export default function Admin() {
   
    return (
        <>

        <div className='bg-grad text-white overflow-auto'>
           
         <div className='px-3 mt-5 pt-5'>
         <div className="row h-100vh">
                <div className="col-lg-2 col-3 h-100 ">
                <ul className="nav flex-column  ps-4 py-4 mt-5">
                <li className="nav-item rounded-5">
                    <Link to="/liveOrders" className='un-underline' aria-current="page" >
                        <i className="fa-solid fa-border-all main-color me-3"></i>
                        Live Orders</Link>
                </li>
                <li className="nav-item rounded-5">
                    <Link to="/offers" className=" un-underline" >
                        <i className="fa-solid fa-percent main-color me-3"></i>
                        Offers</Link>
                </li>
                <li className="nav-item rounded-5">
                    <Link to="/ManageProducts" className="  un-underline" >
                        <i className="fa-solid fa-newspaper  main-color me-3"></i>
                        Products</Link>
                </li>
                <li className="nav-item rounded-5">
                    <Link to="/bestSeller" className="  un-underline" >
                        <i className="fa-solid fa-money-bill-trend-up main-color me-3"></i>
                        Best Seller</Link>
                </li>

            </ul>

                </div>
                <div className="col-lg-10 col-md-9 ">
                    <div className=' Gray-Color main-color-border m-3 p-3 rounded-5 text-center'>
                    <h2>Welcome to Admin Page </h2>
               

                    </div>
            
            </div>
            </div>
         </div>
          
          

        </div>
        </>
    )
}
