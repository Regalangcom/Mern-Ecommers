import React, { useState } from 'react'
// import loginIcons from '../assest/people-login.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ResetPasswords = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)
  const [data,setData] = useState({
      email : "",
      newPassword : "",
      confirmPassword : "",
  })
  const navigate = useNavigate()

  const handleOnChange = (e) =>{
      const { name , value } = e.target

      setData((preve)=>{
          return{
              ...preve,
              [name] : value
          }
      })
  }




  const handleSubmit = async(e) =>{
      e.preventDefault()

      if(data.newPassword === data.confirmPassword){

        const dataResponse = await axios.put(`${import.meta.env.VITE_PORT_SERVER}/api/resetPassword` , data , 
        { withCredentials : true })

          if(dataResponse.data.success){
            toast.success(dataResponse.data.message)
            navigate("/login")
          }

          if(dataResponse.data.error){
            toast.error(dataResponse.data.message)
          }
    
      }else{
        toast.error("Please check password and confirm password")
      }

console.log('data :' , data);
  }

  return (
    <section id='signup'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-sm mx-auto'>


                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                    type='email' 
                                    placeholder='enter email' 
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>
                            </div>
                        </div>

                        <div>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='enter password'
                                    value={data.newPassword}
                                    name='newPassword' 
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>
                                <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash/>
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label>Confirm Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder='enter confirm password'
                                    value={data.confirmPassword}
                                    name='confirmPassword' 
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>

                                <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                <FaEyeSlash/>
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className='bg-blue-900 hover:bg-blue-500 text-white px-6 py-2 w-full max-w-[250px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Change Password</button>

                    </form>

                    <p className='my-5'>Already have account ? <Link to={"/login"} className=' text-blue-900 hover:text-blue-600 hover:underline'>Login</Link></p>
            </div>


        </div>
    </section>
  )
}

export default ResetPasswords