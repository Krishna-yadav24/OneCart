import React from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from 'react';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import Loading from '../component/Loading';
//import toast from 'react-toastify'
function Login() {
    let [show,setShow] = useState(false)
    let [showAdminMenu, setShowAdminMenu] = useState(false)
        let [email,setEmail] = useState("")
        let [password,setPassword] = useState("")
        let {serverUrl} = useContext(authDataContext)
        let {getCurrentUser} = useContext(userDataContext)
        let [loading,setLoading] = useState(false)

    let navigate = useNavigate()

    const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            let result = await axios.post(serverUrl + '/api/auth/login',{
                email,password
            },{withCredentials:true})
            console.log(result.data)
            setLoading(false)
            getCurrentUser()
            navigate("/")
            toast.success("User Login Successful")
            
        } catch (error) {
            console.log(error)
            toast.error("User Login Failed")
        }
    }
     const googlelogin = async () => {
            try {
                const response = await signInWithPopup(auth , provider)
                let user = response.user
                let name = user.displayName;
                let email = user.email
    
                const result = await axios.post(serverUrl + "/api/auth/googlelogin" ,{name , email} , {withCredentials:true})
                console.log(result.data)
                getCurrentUser()
            navigate("/")
    
            } catch (error) {
                console.log(error)
            }
            
        }
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start relative'>
    <div className='w-[100%] h-[80px] flex items-center justify-between px-[30px]'>
        <div className='flex items-center gap-[10px] cursor-pointer' onClick={()=>navigate("/")}>
            <img className='w-[40px]' src={Logo} alt="" />
            <h1 className='text-[22px] font-sans '>OneCart</h1>
        </div>
        
        <div className='relative'>
            <HiDotsVertical 
                className='w-[25px] h-[25px] cursor-pointer hover:text-[#6060f5] transition-colors' 
                onClick={() => setShowAdminMenu(prev => !prev)}
            />
            {showAdminMenu && (
                <div className='absolute top-[40px] right-0 w-[200px] bg-[#1a1a1a] border-[1px] border-[#96969635] rounded-lg shadow-lg p-[10px] z-10'>
                    <a 
                        href="https://onecart-admin1-5jwv.onrender.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className='block w-full text-center py-[12px] px-[15px] hover:bg-[#6060f5] rounded-lg transition-colors text-[15px]'
                        onClick={() => setShowAdminMenu(false)}
                    >
                        Login as Admin
                    </a>
                </div>
            )}
        </div>
    </div>

    <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
        <span className='text-[25px] font-semibold'>Login Page</span>
        <span className='text-[16px]'>Welcome to OneCart, Place your order</span>

    </div>
    <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center '>
        <form action="" onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
            <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googlelogin}>
                <img src={google} alt="" className='w-[20px]'/> Login account with Google
            </div>
            <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
             <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
            </div>
            <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px]  relative'>
              
                 <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required  onChange={(e)=>setEmail(e.target.value)} value={email}/>
                  <input type={show?"text":"password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
                  {!show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]' onClick={()=>setShow(prev => !prev)}/>}
                  {show && <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]' onClick={()=>setShow(prev => !prev)}/>}
                  <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>{loading? <Loading/> : "Login"}</button>
                  <p className='flex  gap-[10px]'>You haven't any account? <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={()=>navigate("/signup")}>Create New Account</span></p>
            </div>
        </form>
    </div>
    </div>
  )
}

export default Login
