import React from 'react'
import logo from "../../assets/img/Rlogo.png"
import styles from "./AdminNavbar.module.css"
import { NavLink } from 'react-router-dom'
export default function AdminNavbar() {
  return (
    <>
       <nav className={` ${styles.bg} navbar navbar-expand-lg py-3 fixed-top`}>
        <div className="container-fluid ">
          <img src={logo} alt="ElectroniXpress" /><h3 className='me-5'>ElectroniXpress</h3>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse text-center" id="navbarNav">
       
          </div>
        </div>
      </nav>
    </>
  )
}
