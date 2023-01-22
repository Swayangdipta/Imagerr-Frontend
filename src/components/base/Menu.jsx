import React from 'react'
import {Link} from 'react-router-dom'

const Menu = ({currentLocation}) => {
  return (
    <div className='fixed flex flex-col items-center gap-[10px] top-[65px] right-[30px] w-[300px] h-max py-[10px] bg-emerald-400 rounded'>
        {
          currentLocation === "home" ? (
            <>
              <Link to="/profile" className='w-[90%]'><button className='w-[100%] h-[35px] border-0 rounded bg-emerald-900 shadow-sm text-white text-[18px]'>Profile</button></Link>
              <Link to="/collections" className='w-[90%]'><button className='w-[100%] h-[35px] border-0 rounded bg-emerald-900 shadow-sm text-white text-[18px]'>Collections</button></Link>           
            </>
          ) : currentLocation === "profile" ? (
            <>
              <Link to="/home" className='w-[90%]'><button className='w-[100%] h-[35px] border-0 rounded bg-emerald-900 shadow-sm text-white text-[18px]'>Home</button></Link>
              <Link to="/collections" className='w-[90%]'><button className='w-[100%] h-[35px] border-0 rounded bg-emerald-900 shadow-sm text-white text-[18px]'>Collections</button></Link>           
            </>
          ) : currentLocation === "collection" ? (
            <>
              <Link to="/home" className='w-[90%]'><button className='w-[100%] h-[35px] border-0 rounded bg-emerald-900 shadow-sm text-white text-[18px]'>Home</button></Link>
              <Link to="/profile" className='w-[90%]'><button className='w-[100%] h-[35px] border-0 rounded bg-emerald-900 shadow-sm text-white text-[18px]'>Profile</button></Link>           
            </>
          ) : ""
        }
        <button className='w-[90%] h-[35px] border-0 rounded bg-red-600 shadow-md text-white text-[18px]'>Sign Out</button>
    </div>
  )
}

export default Menu