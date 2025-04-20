import React, { useContext, useEffect, useState } from 'react'
import { CategoryContext } from '../context/CategoryContext'
import Loader from '../Loader/Loader'
import { useQuery } from 'react-query'
import axios from 'axios'

export default function Categories() {
  // let [Loading , setLoading]=useState(true)
  // let {getCategories}= useContext(CategoryContext)
  function getCategoriess(){
    return axios.get('http://localhost:3000/api/v1/category/')
  }

let {data , isError , isLoading , isFetching}=  useQuery('getCategoriess' , getCategoriess , {
  cacheTime:1000
})

      console.log(data)
  return (
    <div>
      
    </div>
  )
}
