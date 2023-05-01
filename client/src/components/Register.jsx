import React from 'react'
import {  useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

const handleSubmit = async(e) =>{
e.preventDefault();
setPassword('')
setUsername('')
setEmail('')

try {
  await axios.post('http://localhost:5000/auth/register', {username, password, email})
  alert('Registration Complete!')
  navigate('/login')
} catch (error) {
  console.log(error)
}


}


  return (
    <div>
        <form onSubmit={handleSubmit} className='w-full h-[100vh] flex items-center justify-center'>
            <div className='flex flex-col'>
            <input className='p-2 focus:outline-none focus:border-b' onChange={e=>setUsername(e.target.value)} value={username} type='text' placeholder='username' />
            <input className='p-2 focus:outline-none focus:border-b' value={password} onChange={e=>setPassword(e.target.value)} type='password' placeholder='password' />
            <input className='p-2 focus:outline-none focus:border-b' value={email} onChange={e=>setEmail(e.target.value)} type='email' placeholder='email' />
            <button className='bg-green-500'>Register</button>
            </div>
        </form>
    </div>
  )
}

export default Register