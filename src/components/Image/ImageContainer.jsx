import React from 'react'
import img1 from './1.jpg'
import img2 from './2.jpg'
import ImageCard from './ImageCard'

const ImageContainer = () => {
  return (
    <div className='w-[calc(70vw_-_40px)] fixed left-0 top-[80px] h-[calc(100vh_-_80px)] overflow-y-scroll flex flex-wrap items-start gap-[10px] gap-x-auto gap-y-[10px] ml-[30px] pb-[30px]'>
        <ImageCard img={img1} />
        <ImageCard img={img2} />
        <ImageCard img={img1} />
        <ImageCard img={img2} />
        <ImageCard img={img1} />
        <ImageCard img={img2} />
        <ImageCard img={img1} />
        <ImageCard img={img2} />
        <ImageCard img={img1} />
        <ImageCard img={img2} />
        <ImageCard img={img1} />
        <ImageCard img={img2} />
        <ImageCard img={img1} />
        <ImageCard img={img1} />
        <ImageCard img={img2} />
        <ImageCard img={img1} />
        <ImageCard img={img2} />
        <ImageCard img={img1} />
        <ImageCard img={img1} />
        <ImageCard img={img2} />
        <ImageCard img={img1} />
        <ImageCard img={img2} />
        <ImageCard img={img2} />
        <ImageCard img={img1} />
        <ImageCard img={img2} />
        <ImageCard img={img1} />
        <ImageCard img={img2} />
        <ImageCard img={img1} />
        <ImageCard img={img2} />
    </div>
  )
}

export default ImageContainer