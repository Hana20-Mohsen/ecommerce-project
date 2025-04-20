import React, { useContext, useState } from 'react'
import styles from './address.module.css'
import { useFormik } from 'formik'
// import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { storeContext } from '../context/storeContext';



export default function Address() {
  let navigate=useNavigate()
  let [Errmsg , setErrmsg]=useState('');
  let [loading , setloading]=useState(true);
let {id}=useParams()
 let {Pay , setCounter} =useContext(storeContext)
  //send data to api
  


  async function sendDataToApi(values){
      setloading(false);
//    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , values).then(({data})=>{
//     console.log(data)
//     setloading(true);
//    if(data.message=='success'){

//     localStorage.setItem('token',data.token);
//     navigate('/Home')
//    }
//    }).catch(err=>{
//     setErrmsg(err.response.data.message );
//     console.log(err.response.data.message )
//    })

   let data=await Pay(id , values);
   console.log(data)
   if(data.status=='success'){
    window.location.href=data.session.url
    // setCounter(0)
   }
  }





  //start formik
  let address = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:'',
    },
    onSubmit:(values)=>{
      console.log(values)
      //convert values to JSON then send to API
      sendDataToApi(values)
    }
   })

// end formik
  return (
    
    <div className={styles.main}>
        <div className="container w-50 pt-5 mt-5">
          <div className=" align-items-center py-5 mt-5" >
            <div className={`${styles.MyForm}  bg-black text-light p-4 mt-s-5`}>
              <h2 className='  fw-light'>address Now</h2>

              {/*//////////////////////////////////////////////////////////// start form  /////////////////////////////////// */}
              <form onSubmit={address.handleSubmit} className='my-4 text-center'>
                <textarea onBlur={address.handleBlur} value={address.values.email} onChange={address.handleChange} className={` ${styles.MyInput} form-control Gray-Color rounded-5    ${address.errors.email?'is-invalid':''} `} type="text" name='details' id='details' placeholder='Details*' ></textarea>
        
                <input onBlur={address.handleBlur} value={address.values.password} onChange={address.handleChange} className={` ${styles.MyInput} form-control Gray-Color rounded-5    ${address.errors.password?'is-invalid':''} `} type="text" name='phone' id='phone' placeholder='Phone*' />

                <input onBlur={address.handleBlur} value={address.values.password} onChange={address.handleChange} className={` ${styles.MyInput} form-control Gray-Color rounded-5    ${address.errors.password?'is-invalid':''} `} type="text" name='city' id='city' placeholder='City*' />
            
                <button disabled={!(address.dirty&&address.isValid)} type='submit' className='btn bg-main text-secondary mt-3 form-control rounded-5'>
                  {loading? 'Pay': <i className='fa fa-spinner fa-spin main-color'></i>}
                </button>
              </form>
               {/*//////////////////////////////////////////////////////////// end form  /////////////////////////////////// */}
            </div>
          </div>
        </div>
    </div>
  )
}

