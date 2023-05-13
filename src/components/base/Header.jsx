import React, { useState } from 'react'
import { isAuthenticated } from '../../utils/LS_Helper'
import Menu from './Menu'
import {BiMenu} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'
import ImageSearch from '../Home/ImageSearch'
import { Link } from 'react-router-dom'
import ToggleTheme from './ToggleTheme'

const Header = ({currentLocation}) => {
    const [isMenuOpen,setIsMenuOpen] = useState(false)
    const {user} = isAuthenticated()
  return (
    <div className='w-[100vw] h-[70px] z-50 flex items-center justify-between dark:bg-zinc-900 bg-zinc-100 border-b dark:border-b-0 border-zinc-400 fixed top-0'>
        <section className='ml-[30px] py-0 my-0'>
            <h1 className='text-[34px] dark:text-zinc-100 text-zinc-900 py-0 mt-[-10px] font-[500] select-none'>Imagerr</h1>
        </section>
        {
            (currentLocation !== "home" && currentLocation !== "login" && currentLocation !== "register") && (
                <ToggleTheme />
            )
        }

        {
            user ? (
                <>
                {
                    currentLocation === "home" && (
                    <section>
                        <ImageSearch />
                    </section> 
                    )
                }
                <section className='mr-[30px] text-[40px] dark:text-zinc-100 text-zinc-900 cursor-pointer' onClick={e=>setIsMenuOpen(!isMenuOpen)}>
                   {!isMenuOpen ? (<BiMenu />) : (<CgClose />)} 
                </section>
                </>
            ) : currentLocation === "login" ? (
                <section className='mr-[30px] flex gap-[20px]'>
                    <Link to={`/login/up`}><button className='px-[20px] py-[5px] text-[18px] text-white font-[600] rounded bg-emerald-500 shadow-lg hover:shadow-none'>Sign up</button></ Link>
                </section>
            ) : currentLocation === "register" ? (
                <section className='mr-[30px] flex gap-[20px]'>
                    <Link to={`/login/in`}><button className='px-[20px] py-[5px] text-[18px] text-white font-[600] rounded bg-emerald-500 shadow-lg hover:shadow-none'>Sign in</button></ Link>
                </section>
            ) : (
                <>
                    <section>
                        <ImageSearch />
                    </section>        
                    <section className='mr-[30px] flex gap-[20px]'>
                        <Link to="/login/in"><button className='px-[20px] py-[5px] text-[18px] text-white font-[600] rounded bg-emerald-500 shadow-lg hover:shadow-none'>Sign in</button></ Link>
                    </section>                
                </>
            )
        }
        {
            isMenuOpen && (<Menu currentLocation={currentLocation} />)
        }
    </div>
  )
}

export default Header