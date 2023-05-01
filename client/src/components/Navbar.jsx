import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {


  return (
    <div className='w-full h-[5vh] flex justify-around bg-black text-white items-center' >
      <Link to = '/'>Home</Link>
        <Link to = '/login'>Login</Link>
      </div>
    
  )
}

export default Navbar