import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Products from '../../products/Products'
import { productContext } from '../../context/ProductContext'

export default function ManageProducts() {


  return (
    <>
      <div className='bg-grad text-white'>
     
        <Products/>

      </div>
    </>
  )
}
