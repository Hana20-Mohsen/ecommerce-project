import React from 'react'
import AdminNavbar from '../../Navbar/AdminNavbar/AdminNavbar'
import { Outlet } from 'react-router-dom'

export default function AdminLayOut() {
  return (
    <>
      <AdminNavbar/>
      
      <Outlet/>
    </>
  )
}
