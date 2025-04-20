import React ,{useContext} from 'react'
import logo from "../../assets/img/Rlogo.png"
import styles from "./CategoryNavbar.module.css"
import { NavLink } from 'react-router-dom'
import { storeContext } from '../../context/storeContext.js'
import { WishListContext } from '../../context/WishlistContext'
export default function CategoryNavbar() {

   let{Counter} =   useContext(storeContext)
   let {WCounter }=useContext(WishListContext)


  return (
    <div>
  <nav className={` ${styles.bg} navbar navbar-expand-lg py-3 fixed-top `}>
        <div className="container-fluid ">
          <img src={logo} alt="ElectroniXpress" /><h3 className='me-5'>ElectroniXpress</h3>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="d-flex justify-content-between px-3 collapse navbar-collapse text-center" id="navbarNav">
            <div >
            <ul className="navbar-nav " >
              <li>
                <NavLink style={{ color: 'white' }} className="nav-link mt-1" to="/camera">Shoes</NavLink>
              </li>
              <li >
                <NavLink style={{ color: 'white' }} className="nav-link mt-1" to="/headphone">Clothes</NavLink>
              </li>
              <li>
                <NavLink style={{ color: 'white' }} className="nav-link mt-1" to="/laptop">Accessories</NavLink>
              </li>
       
            </ul>
              </div>
              <div>
            
            <ul className='navbar-nav '>
            <li>
                <NavLink style={{ color: 'white' }} className="btn  position-relative mt-1" to="/wishlist">Wishlist
                <i className={` ${styles.iconColor} icon-link fa-solid fa-heart ms-2`}></i>
             {WCounter?     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
               {WCounter}
                    <span className="visually-hidden">unread messages</span>
                  </span> : ''}
                </NavLink>
              </li>
              <li>
                <NavLink style={{ color: 'white' }} to='/cart' className="btn  position-relative ms-3 mt-1">Cart
                <i className={` ${styles.iconColor} mx-2 icon-link fa-solid fa-cart-shopping ms-2`}  ></i> 
            {Counter?      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                { Counter}
                    <span className="visually-hidden">unread messages</span>
                  </span> :''}
                </NavLink>
              </li>
            </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
