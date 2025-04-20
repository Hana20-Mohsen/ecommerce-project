import React, { useState } from 'react'
import styles from './SigUp.module.css'
import logoImg from'../assets/img/ElecLogo.png'
import { useFormik } from 'formik'
// import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainLayOut from '../layouts/MainLayOut';



export default function SignUp() {

let navigate=useNavigate()
let [Errmsg , setErrmsg]=useState('');
let [loading , setloading]=useState(true);
//send data to api

  function sendDataToApi(values){
    setloading(false);
 axios.post('http://localhost:3000/api/v1/user/register' , values)
 .then(({data})=>{
  console.log(data)
  setloading(true);
  //------------- if condition data.message=="success" -------------------
 if(data){
  console.log("your rsponse  = "+data)
  navigate('/Signin')
 }
 }).catch(err=>{
  setErrmsg(err?.response?.data?.message );
  console.log(err?.response?.data?.message )
 })
}



// validation function 

function validate(values){
  const myError={}

  if(!values.name){
    myError.name='First Name is required'
  }

  if(!values.email){
    myError.email='Email is required'
  }
if(!/^[A-Z][a-zA-Z0-9]{6,}$/.test(values.password)){
  myError.password='Please enter a valid Password'
}

if(!values.phone){
  myError.phone='Phone Number is required'
}


  return myError
}


  //start formik
 let Register = useFormik({
  initialValues:{
    name:'',
    email:'',
    password:'',
    confirmationPassword:'',
    phone:'',
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


 console.log(Register.errors)
// end formik


// // start ckeckBox

// const [isChecked, setIsChecked] = useState(false);
// const handleCheckboxChange = () => {
//   setIsChecked(!isChecked);
// };
  return (
    
    <div className={styles.main}>
        <div className="container pt-5 mt-5">
          <div className="row align-items-center py-5 mt-5" >
             {/*//////////////////////////////////////////////////////////// start logo  /////////////////////////////////// */}
            <div className="col-md-6  text-center text-white mb-5">
              <img className='w-25 me-md-5 ' src={logoImg}alt="ElectroniXpress" />
              <h2 className='mt-3 me-4'>ElectroniXpress</h2> <span >helps you find all electronics you need</span>
               {/*//////////////////////////////////////////////////////////// end logo  /////////////////////////////////// */}
            </div>
            <div className={`${styles.MyForm}   col-md-6 bg-black text-light p-4 mt-s-5`}>
              <h2 className='  fw-light'>Register Now</h2>

              {/*//////////////////////////////////////////////////////////// start form  /////////////////////////////////// */}
              <form onSubmit={Register.handleSubmit} className='my-4 text-center'>
              
                 
                    {/* <label htmlFor="Name">Name:</label> */}
                  
                      <input onBlur={Register.handleBlur} value={Register.values.name} onChange={Register.handleChange} className={` ${styles.MyInput} form-control Gray-Color rounded-5  ${Register.errors.name?'is-invalid':''}   `} type="text" name='name' id='FirstName' placeholder='First Name*' />
                      {Register.errors.name && Register.touched.name ? <div className="alert alert-danger">
                        {Register.errors.name}
                      </div>:''}
                  
              
                <input onBlur={Register.handleBlur} value={Register.values.email} onChange={Register.handleChange} className={` ${styles.MyInput} form-control Gray-Color rounded-5    ${Register.errors.email?'is-invalid':''} `} type="text" name='email' id='Email' placeholder='Email*' />
               {Register.errors.email && Register.touched.email?  <div className="alert alert-danger">
                  {Register.errors.email}
                </div>:''}
                <input onBlur={Register.handleBlur} value={Register.values.password} onChange={Register.handleChange} className={` ${styles.MyInput} form-control Gray-Color rounded-5    ${Register.errors.password?'is-invalid':''} `} type="password" name='password' id='Password' placeholder='Password*' />
               {Register.errors.password && Register.touched.password?  <div className="alert alert-danger">
                  {Register.errors.password}
                </div> :''}
                <input onBlur={Register.handleBlur} value={Register.values.confirmationPassword} onChange={Register.handleChange} className={` ${styles.MyInput} form-control Gray-Color rounded-5    ${Register.errors.confirmationPassword?'is-invalid':''} `} type="password" name='confirmationPassword' id='confirmationPassword' placeholder='confirmationPassword*' />
               {Register.errors.confirmationPassword && Register.touched.confirmationPassword?  <div className="alert alert-danger">
                  {Register.errors.confirmationPassword}
                </div> :''}
          
                <input onBlur={Register.handleBlur} value={Register.values.phone} onChange={Register.handleChange} className={` ${styles.MyInput} form-control Gray-Color rounded-5    ${Register.errors.phone?'is-invalid':''} `} type="tet" name='phone' id='phone' placeholder='phone*' />
               {Register.errors.phone && Register.touched.phone?  <div className="alert alert-danger">
                  {Register.errors.phone}
                </div> :''}

           {Errmsg? <div className="alert alert-danger">
              {Errmsg}
            </div>:''}
                <button disabled={!(Register.dirty&&Register.isValid)} type='submit' className='btn bg-main text-secondary mt-3 form-control rounded-5'>
                  {loading? 'SignUp': <i className='fa fa-spinner fa-spin main-color'></i>}
                </button>
                {/* <label ><input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} /> admin</label> */}
                
              </form>
               {/*//////////////////////////////////////////////////////////// end form  /////////////////////////////////// */}
            </div>
          </div>
        </div>
    </div>
  )
}