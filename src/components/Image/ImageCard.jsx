import React from 'react'
import { Link } from 'react-router-dom'

const ImageCard = ({img,author}) => {
  return (
    <div className='h-[200px] rounded bg-emerald-200 relative top-0'>
        <h6 className='absolute top-[10px] left-[10px] rounded bg-white px-[10px]'>JPG</h6> {/* Image Format Here */}
        <img src={img} alt="" className='h-[100%] rounded cursor-pointer' />

        <h6 className='text-white text-overflow-hidden overflow-hidden absolute left-0 bottom-0 w-[100%] h-[25px] bg-[#00000073] indent-[10px]'>By Swayangdipta Das</h6>
    </div>
  )
}

export default ImageCard