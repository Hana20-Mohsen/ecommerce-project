import React from 'react'
import { Outlet } from 'react-router-dom'
import CategoryNavbar from '../../categories/categoryNavbar/CategoryNavbar'

export default function CategoryLayOut() {
  return (
    <>
    <CategoryNavbar/>
      <Outlet/>
    </>
  )
}
