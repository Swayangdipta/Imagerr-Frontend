import React, { useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { signOut } from '../auth/helper/authApiCalls'

const Menu = ({currentLocation,setIsMenuOpen=f=>f}) => {
  const [isRedirect,setIsRedirect] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const handleClick = () => {
    setIsLoading(true)
    signOut().then(resp => {
      if(resp){
        setIsRedirect(true)
        setIsMenuOpen(false)
        setIsLoading(false)
        return toast.success('Signed out!',{theme: 'colored'})
      }
      setIsLoading(false)
      setIsRedirect(false)
      return toast.error("Faild to signout!",{theme: 'colored'})
    })
  }
  return (
    <div className='fixed z-50 flex flex-col items-center gap-[10px] top-[75px] right-[30px] border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 border-[1px] w-[300px] h-max py-[10px] bg-zinc-200 rounded'>
        {isRedirect && (<Navigate to="/login/in" />)}
        {
          currentLocation === "home" ? (
            <>
              <Link to="/profile" className='w-[90%]'><button className='w-[100%] h-[35px] border-0 rounded bg-emerald-600 shadow-sm text-white text-[18px]'>Profile</button></Link>
              <Link to="/collections" className='w-[90%]'><button className='w-[100%] h-[35px] border-0 rounded bg-emerald-600 shadow-sm text-white text-[18px]'>Collections</button></Link>           
            </>
          ) : currentLocation === "profile" ? (
            <>
              <Link to="/home" className='w-[90%]'><button className='w-[100%] h-[35px] border-0 rounded bg-emerald-600 shadow-sm text-white text-[18px]'>Home</button></Link>
              <Link to="/collections" className='w-[90%]'><button className='w-[100%] h-[35px] border-0 rounded bg-emerald-600 shadow-sm text-white text-[18px]'>Collections</button></Link>           
            </>
          ) : currentLocation === "collection" ? (
            <>
              <Link to="/home" className='w-[90%]'><button className='w-[100%] h-[35px] border-0 rounded bg-emerald-600 shadow-sm text-white text-[18px]'>Home</button></Link>
              <Link to="/profile" className='w-[90%]'><button className='w-[100%] h-[35px] border-0 rounded bg-emerald-600 shadow-sm text-white text-[18px]'>Profile</button></Link>           
            </>
          ) : ""
        }
        <button onClick={handleClick} className='w-[90%] h-[35px] border-0 rounded bg-red-600 shadow-md text-white text-[18px]'>{isLoading ? ('Loading...') : ('Sign Out')}</button>
    </div>
  )
}

export default Menu