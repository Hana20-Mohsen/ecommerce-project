import React from 'react'
import logoImg from'../assets/img/ElecLogo.png'
import { Link } from 'react-router-dom'
export default function Footer() {
    return (
        <>
            <div className=" px-3 pt-5 mt-5">
                <div className="row bg-blackAndGray pb-4 ">
                    <div className="col-md-5 text-center">
                    <img className='w-25 me-md-5 ' src={logoImg}alt="ElectroniXpress" />
                    <h4 className='text-white'> Unleash the Power of Technology</h4>
                    <h6 className='main-color'>ElectroniXpress@Ecommerce.com</h6>
                    </div>
                    <div className="col-md-2 text-white fs-6">
                        <h3>Architecture</h3>
                        <ul className=' list-unstyled'>
                            <li>
                              <Link className='un-underline hover-color' to="/"> Home</Link> 
                            </li>
                            <li>
                               <Link className='un-underline hover-color' to="/products"> Products</Link>
                            </li>
                            <li>
                            
                                <Link className='un-underline hover-color' to="/category">Categories</Link>
                            </li>
                            <li>
                               <Link className='un-underline hover-color' to="/cart"> Cart</Link>
                            </li>
                            <li>
                                
                                <Link className='un-underline hover-color' to="/wishlist">Wish List</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-2 text-white fs-6">
                        <h3>Services</h3>
                        <ul className=' list-unstyled'>
                            <li>
                            Delivery 
                            </li>
                            <li>
                                Discounts 
                            </li>
                            <li>
                                Free Shipping
                            </li>
                            <li>
                                Retrievability
                            </li>
                          
                        </ul>
                    </div>
                    <div className="col-md-3 text-white fs-6">
                    <h3>Follow</h3>
                    <ul className='list-unstyled fs-5'>
                        <Link className='un-underline'>
                        <li>
                        <i className="fa-brands fa-twitter main-color me-3"></i>
                    <i className="fa-brands fa-facebook-f main-color me-3"></i>
                    <i className="fa-brands fa-google-play main-color me-3"></i>
                    <i className="fa-brands fa-pinterest-p main-color me-3"></i>
                    <i className="fa-brands fa-youtube main-color me-3"></i>
                    <i className="fa-brands fa-google-plus-g main-color me-3"></i>
                    <i className="fa-brands fa-instagram main-color me-3"></i>
                        </li>
                        </Link>
                    </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
