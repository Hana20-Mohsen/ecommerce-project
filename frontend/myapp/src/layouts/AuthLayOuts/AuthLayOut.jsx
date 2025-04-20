import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from "../../assets/img/Rlogo.png"
import styles from "./AuthNav.module.css"
import { NavLink } from 'react-router-dom'
export default function AuthLayOut() {
  return (
    <>
     <nav className={` ${styles.bg} navbar navbar-expand-lg py-3 fixed-top`}>
        <div className="container-fluid ">
          <img src={logo} alt="ElectroniXpress" /><h3 className='me-5'>ElectroniXpress</h3>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse text-center" id="navbarNav">
            <ul className="navbar-nav ms-auto" >
              <li >
                <NavLink style={{ color: 'white' }} className="nav-link" to="/signin">Sign in</NavLink>
              </li>
              <li >
                <NavLink style={{ color: 'white' }} className="nav-link" to="/signup">Sign up</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet/>
    </>
  )
}
