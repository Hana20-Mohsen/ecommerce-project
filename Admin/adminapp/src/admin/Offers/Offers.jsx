import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Offers.module.css'
import logoImg from'../../assets/img/ElecLogo.png'
import { toast } from 'react-toastify';


export default function Offers() {

  let navigate = useNavigate()
  let [Errmsg, setErrmsg] = useState('');
  let [loading, setloading] = useState(true);

  function sendDataToApi(values) {
    setloading(false);
    axios.post('http://localhost:3000/api/v1/order/coupon', values)
      .then(({ data }) => {
        console.log(data)
        setloading(true);
        //------------- if condition data.message=="success" -------------------
        if (data) {
          console.log("your rsponse  = " + data)
          toast.success("Product added successfully !")
        }
      }).catch(err => {
        setErrmsg(err?.response?.data?.message);
        console.log(err?.response?.data?.message)
      })
  }


  // validation function 

  function validate(values) {
    const myError = {}

    if (!values.code) {
      myError.code = 'Coupon code is required'
    }

    if (!values.isPercent) {
      myError.isPercent = 'Percent is required'
    }

    if (!values.amount) {
      myError.amount = 'amount Number is required'
    }
    return myError
  }


  //start formik
 let coupon = useFormik({
  initialValues:{
    code:'',
    isPercent:'',
    amount:'',
  },
  validate
  ,
  onSubmit:(values)=>{
    console.log(values)
    //convert values to JSON then send to API
    sendDataToApi(values)
    // {isChecked? <AdminLayOut/> :<MainLayOut/>}
  }
 })


  return (
    <>
      <div className=' bg-grad text-white '>
        
        

        <div className={styles.main}>
        <div className="container pt-5 mt-5">
        <Link to="/admin"> <i className="fa-solid fa-circle-arrow-left main-color fs-2 "></i></Link>
          <div className="row align-items-center py-5 mt-5" >
             {/*//////////////////////////////////////////////////////////// start logo  /////////////////////////////////// */}
            <div className="col-md-6  text-center text-white mb-5">
              <img className='w-25 me-md-5 ' src={logoImg}alt="ElectroniXpress" />
              <h2 className='mt-3 me-4'>ElectroniXpress</h2> <span >helps you find all electronics you need</span>
               {/*//////////////////////////////////////////////////////////// end logo  /////////////////////////////////// */}
            </div>
            <div className={`${styles.MyForm}   col-md-6 bg-black text-light p-4 mt-s-5`}>
              <h2 className='  fw-light'>coupon Now</h2>

              {/*//////////////////////////////////////////////////////////// start form  /////////////////////////////////// */}
              <form onSubmit={coupon.handleSubmit} className='my-4 text-center'>
              
                 
                    {/* <label htmlFor="Name">Name:</label> */}
                  
                      <input onBlur={coupon.handleBlur} value={coupon.values.code} onChange={coupon.handleChange} className={` ${styles.MyInput} form-control Gray-Color rounded-5  ${coupon.errors.code?'is-invalid':''}   `} type="text" name='code' id='code' placeholder='code*' />
                      {coupon.errors.code && coupon.touched.code ? <div className="alert alert-danger">
                        {coupon.errors.code}
                      </div>:''}
                  
              
                <input onBlur={coupon.handleBlur} value={coupon.values.isPercent} onChange={coupon.handleChange} className={` ${styles.MyInput} form-control Gray-Color rounded-5    ${coupon.errors.isPercent?'is-invalid':''} `} type="number" name='isPercent' id='isPercent' placeholder='isPercent*' />
               {coupon.errors.isPercent && coupon.touched.isPercent?  <div className="alert alert-danger">
                  {coupon.errors.isPercent}
                </div>:''}


                <input onBlur={coupon.handleBlur} value={coupon.values.amount} onChange={coupon.handleChange} className={` ${styles.MyInput} form-control Gray-Color rounded-5    ${coupon.errors.amount?'is-invalid':''} `} type="number" name='amount' id='amount' placeholder='amount*' />
               {coupon.errors.amount && coupon.touched.amount?  <div className="alert alert-danger">
                  {coupon.errors.amount}
                </div> :''}
          

           {Errmsg? <div className="alert alert-danger">
              {Errmsg}
            </div>:''}
                <button disabled={!(coupon.dirty&&coupon.isValid)} type='submit' className='btn bg-main text-secondary mt-3 form-control rounded-5'>
                  {loading? 'Submit': <i className='fa fa-spinner fa-spin main-color'></i>}
                </button>
                {/* <label ><input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} /> admin</label> */}
                
              </form>
               {/*//////////////////////////////////////////////////////////// end form  /////////////////////////////////// */}
            </div>
          </div>
        </div>
    </div>
      </div>
    </>
  )
}
