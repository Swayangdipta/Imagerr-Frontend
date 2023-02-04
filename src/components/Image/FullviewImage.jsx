import React from 'react'
import {AdvancedImage, lazyload} from '@cloudinary/react'

const FullviewImage = ({image,width,height}) => {
  return (
    <div className={`${width > height ? ("w-[200%]") : ('w-full')} z-10`}>
      <AdvancedImage className="select-none object-cover w-[100%] h-[100%] z-10 rounded-l-md" cldImg={image} plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.25})]} />
    </div>
  )
}

export default FullviewImage