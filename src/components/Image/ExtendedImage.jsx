import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../base/Header'
import FullviewImage from './FullviewImage'
import ImageInfo from './ImageInfo'
import img1 from './1.jpg'

const ExtendedImage = () => {
    const {id} = useParams()
  return (
    <div>
      <Header currentLocation={"home"} />
      <div className='w-screen h-screen fixed top-0 left-0 blur-2xl z-0'>
        <img src={img1} className="w-full h-full object-cover" alt="Background Image" />
      </div>
      <div className='w-[calc(100vw_-_60px)] z-10 h-[calc(100vh_-_90px)] mt-[80px] flex justify-between mx-[30px]'>
        <FullviewImage image={img1} height={720} width={1280} />
        <div className='w-full z-10 relative top-0'>
          <ImageInfo data={{image: img1,title: "Some shitty title for an image describing it", author: "Swayangdipta Das",isFree: false,category: 'Nature', price: 2000,width: 1280,height: 720,size: '3200',format: 'JPG',tags: ['Bird','Nature','Black and White','SOme things']}} />
        </div>
      </div>
    </div>
  )
}

export default ExtendedImage