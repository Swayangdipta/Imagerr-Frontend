import React from 'react'

const FullviewImage = ({image,width,height}) => {
  return (
    <div className={`${width > height ? ("w-[200%]") : ('w-full')} z-10`}>
      <img className={`select-none object-cover w-[100%] h-[100%] z-10 rounded-l-md`} src={image} alt="" />
    </div>
  )
}

export default FullviewImage