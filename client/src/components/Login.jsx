import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {
  const [username, setUsername ] = useState("");
  const [password, setPassword ] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();


const handleSubmit = async(e) =>{
  e.preventDefault();
  setUsername('');
  setPassword('');
  setEmail('');

  navigate('/login')




  try{
  const response = await axios.post('http://localhost:5000/auth/login', {username, password, email})
  console.log(response.data)
  }catch(error){
    console.log(error)
  }

}



  return (
    <div>
        <form onSubmit={handleSubmit} className='w-full h-[100vh] flex items-center justify-center'>
            <div className='flex flex-col'>
            <input className='p-2 focus:outline-none focus:border-b' onChange={e=>setUsername(e.target.value)} value={username} type='text' placeholder='username' />
            <input className='p-2 focus:outline-none focus:border-b' value={password} onChange={e=>setPassword(e.target.value)} type='password' placeholder='password' />
            <input className='p-2 focus:outline-none focus:border-b' value={email} onChange={e=>setEmail(e.target.value)} type='email' placeholder='Email' />
            <div className='w-full h-full text-center pt-5'>
            <button className='bg-green-500 rounded-lg '>Login</button>
            </div>
            <div className='w-full h-full pt-5 text-center'>
           <button className=''><Link to ='/register'>Register</Link></button> 
           </div>
            </div>
        </form>
    </div>
  )
}

export default Login