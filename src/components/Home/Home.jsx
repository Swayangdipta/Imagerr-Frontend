import React, { useEffect, useState } from 'react'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { isAuthenticated } from '../../utils/LS_Helper'
import Header from '../base/Header'
import ImageContainer from '../Image/ImageContainer'
import ImageFilters from './ImageFilters'
import UploadForm from './UploadForm'

const Home = () => {
  const [isFormOpen,setIsFormOpen] = useState(false)

  const {user,token} = isAuthenticated()
  return (
    <div>
        <Header currentLocation="home" />
        <div className='flex mx-auto w-[calc(100%_-_60px)] z-0 relative top-[80px] gap-[10px]'>
          <ImageContainer />
          <ImageFilters />          
        </div>
        {
          user?.role >= 2 && token && (
            <div onClick={e=>setIsFormOpen(true)} className='w-[60px] h-[60px] text-zinc-100 text-[38px] cursor-pointer hover:shadow-none bg-emerald-600 shadow-lg fixed bottom-[20px] right-[30px] rounded flex items-center justify-center'>
              <MdAddPhotoAlternate />
            </div>
          )
        }

        {
          isFormOpen && user?.role === 2 && token && (
            <UploadForm setIsFormOpen={setIsFormOpen} />
          )
        }           
    </div>
  )
}

export default Home