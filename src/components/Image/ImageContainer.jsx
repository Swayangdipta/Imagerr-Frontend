import React from 'react'
import img1 from './1.jpg'
import img2 from './2.jpg'
import ImageCard from './ImageCard'

const ImageContainer = () => {
  return (
    <div className='w-[100%] h-[calc(100vh_-_90px)] overflow-y-scroll flex flex-wrap items-start gap-[10px] gap-x-auto gap-y-[10px] pb-[30px]'>
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