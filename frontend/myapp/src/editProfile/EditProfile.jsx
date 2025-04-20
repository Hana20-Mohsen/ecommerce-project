import React from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditProfile() {
    let navigate=useNavigate()
    let [Errmsg , setErrmsg]=useState('');
    let [loading , setloading]=useState(true);
//  send data to API
    function sendDataToApi(values){
        setloading(false);
     axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , values).then(({data})=>{
      console.log(data)
      setloading(true);
     if(data.message=='success'){
  
      localStorage.setItem('token',data.token);
      navigate('/Home')
     }
     }).catch(err=>{
      setErrmsg(err.response.data.message );
      console.log(err.response.data.message )
     })
    }
  


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
      

    let profile = useFormik({
        initialValues:{
            name:'',
          email:'',
          password:'',
          newpassword:'',
          repassword:'',
          phone:'',
          Website:'',

        },
        validate
        ,
        onSubmit:(values)=>{
          console.log(values)
          //convert values to JSON then send to API
          sendDataToApi(values)
        }
       })
  return (
    <div className='bg-grad mt-5'>
   
    <div className="container light-style flex-grow-1 container-p-y  py-5">
  <h4 className="font-weight-bold py-3 mb-4 text-white">
    Account settings
  </h4>
 <div className=' d-flex justify-content-end mb-3'>
 <Link to="/changepassword" className='un-underline btn bg-main text-black profile-btn'>Change Password</Link>
 </div>
  <div className="card overflow-hidden Gray-Color ">
    <div className="row-bordered row-border-light ">
     
      <div className="">
        <div className="tab-content ">
          <div className="tab-pane fade active show" id="account-general">
            <div className="card-body media align-items-center">
             
              <div className="form-group">
                <label className="form-label text-white">Name</label>
                <input type="text" className="form-control" defaultValue="Nelle Maxwell" name='name' />
              </div>
              <div className="form-group">
                <label className="form-label text-white">E-mail</label>
                <input type="text" className="form-control mb-1" defaultValue="nmaxwell@mail.com" name='email'/>
                
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="account-change-password">
            <div className="card-body pb-2">
              <div className="form-group">
                <label className="form-label">Current password</label>
                <input type="password" className="form-control" name='password' />
              </div>
              <div className="form-group">
                <label className="form-label">New password</label>
                <input type="password" className="form-control" name='newpassword'/>
              </div>
              <div className="form-group">
                <label className="form-label">Repeat new password</label>
                <input type="password" className="form-control" name='repassword'/>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <div className="text-right mt-3">
    <button type="button" className="btn bg-main profile-btn">Save changes</button>
   <Link to="/profile" className='btn text-white'>Cancel</Link>
  </div>
</div>

    </div>
  )
}
