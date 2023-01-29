import React, { useState } from 'react'
import { isAuthenticated } from '../../utils/LS_Helper'
import Menu from './Menu'
import {BiMenu} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'
import ImageSearch from '../Home/ImageSearch'

const Header = ({currentLocation}) => {
    const [isMenuOpen,setIsMenuOpen] = useState(false)
    const {user} = isAuthenticated()
  return (
    <div className='w-[100vw] h-[70px] z-50 flex items-center justify-between bg-zinc-100 border-b border-zinc-400 fixed top-0'>
        <section className='ml-[30px] py-0 my-0'>
            <h1 className='text-[34px] text-zinc-900 py-0 mt-[-10px] font-[500] select-none'>Imagerr</h1>
        </section>
        <section>
            <ImageSearch />
        </section>
        {
            user ? (
                <section className='mr-[30px] text-[40px] text-zinc-900 cursor-pointer' onClick={e=>setIsMenuOpen(!isMenuOpen)}>
                   {!isMenuOpen ? (<BiMenu />) : (<CgClose />)} 
                </section>
            ) : (
                <section className='mr-[30px] flex gap-[20px]'>
                    <button className='px-[20px] py-[5px] text-[18px] text-white font-[600] rounded bg-emerald-500 shadow-lg hover:shadow-none'>Sign in</button>
                </section>
            )
        }
        {
            isMenuOpen && (<Menu currentLocation={currentLocation} />)
        }
    </div>
  )
}

export default Header