import React, { useState } from 'react'
import styles from './Signin.module.css'
import logoImg from'../assets/img/ElecLogo.png'
import { useFormik } from 'formik'
// import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function Signin() {
  
// start ckeckBox

const [isChecked, setIsChecked] = useState(false);
const handleCheckboxChange = () => {
  setIsChecked(!isChecked);
};
  let navigate=useNavigate()
  let [Errmsg , setErrmsg]=useState('');
  let [loading , setloading]=useState(true);
  //send data to api
  
    function sendDataToApi(values){
      setloading(false);
   axios.post('http://localhost:3000/api/v1/user/login' , values).then(({data})=>{
    console.log(data)
    setloading(true);
      //------------- if condition data.message=="success" -------------------
   if(data){

    localStorage.setItem('token',data.token);
    navigate('/Home')

   }
   }).catch(err=>{
    setErrmsg(err.response.data.message );
    console.log(err.response.data.message )
   })
  }


// validation function 

function validate(values){
  const myError={}

  if(!values.email){
    myError.email='Email is required'
  }
if(!/^[A-Z][a-zA-Z0-9]{6,}$/.test(values.password)){
  myError.password='Please enter a valid Password'
}

return myError
}


  //start formik
  let login = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validate
    ,
    onSubmit:(values)=>{
      console.log(values)
      //convert values to JSON then send to API
      sendDataToApi(values)

    }
   })


// end formik


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
              <h2 className='  fw-light'>login Now</h2>

              {/*//////////////////////////////////////////////////////////// start form  /////////////////////////////////// */}
              <form onSubmit={login.handleSubmit} className='my-4 text-center'>
                <input onBlur={login.handleBlur} value={login.values.email} onChange={login.handleChange} className={` ${styles.MyInput} form-control Gray-Color rounded-5    ${login.errors.email?'is-invalid':''} `} type="text" name='email' id='Email' placeholder='Email*' />
               {login.errors.email && login.touched.email?  <div className="alert alert-danger">
                  {login.errors.email}
                </div>:''}
                <input onBlur={login.handleBlur} value={login.values.password} onChange={login.handleChange} className={` ${styles.MyInput} form-control Gray-Color rounded-5    ${login.errors.password?'is-invalid':''} `} type="password" name='password' id='Password' placeholder='Password*' />
               {login.errors.password && login.touched.password?  <div className="alert alert-danger">
                  {login.errors.password}
                </div> :''}
          
                {Errmsg? <div className="alert alert-danger">
              {Errmsg}
            </div>:''}
        
                <button disabled={!(login.dirty&&login.isValid)} type='submit' className='btn bg-main text-secondary mt-3 form-control rounded-5'>
                  {loading? 'SignIn': <i className='fa fa-spinner fa-spin main-color'></i>}
                </button>

              
              </form>
               {/*//////////////////////////////////////////////////////////// end form  /////////////////////////////////// */}
            </div>
          </div>
        </div>
    </div>
  )
}

