import React, { useContext, useEffect } from 'react'
import img1 from './1.jpg'
import img2 from './2.jpg'
import ImageCard from './ImageCard'
import {ImageContext} from '../../context/ImageContext'

const ImageContainer = () => {
  const [images,setImages] = useContext(ImageContext)
  useEffect(()=>{
    console.log(images);
  },[images])
  return (
    <div className='w-[100%] h-[calc(100vh_-_90px)] overflow-x-hidden overflow-y-scroll flex flex-wrap items-start gap-[10px] gap-x-auto gap-y-[10px] pb-[30px]'>
      {
        images.length > 0 && images.map((image,index) => (
          <ImageCard image={image} key={index} />
        ))
      }
        {/* <ImageCard image={{img:img1,author: "Swayangdipta Das",_id: "shuygsuhg672281bjnb"}} />
        <ImageCard image={{img:img2,author: "Swayangdipta Das",_id: "shuygsuhg672281bjnb"}} /> */}
    </div>
  )
}

export default ImageContainer