import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Cloudinary} from '@cloudinary/url-gen'
import {AdvancedImage, lazyload} from '@cloudinary/react'
import {thumbnail} from "@cloudinary/url-gen/actions/resize"
import Header from '../base/Header'
import FullviewImage from './FullviewImage'
import ImageInfo from './ImageInfo'
import img1 from './1.jpg'
import { getASingleImage } from './helper/imageApiCalls'
import { toast } from 'react-toastify'

const ExtendedImage = () => {
    const [image,setImage] = useState({})
    const [cldImage,setCldImage] = useState('')
    const {id} = useParams()

    useEffect(()=>{
      getASingleImage(id).then(data=>{
        if(data?.response?.data?.error){
          return toast.error(data?.response?.data?.error,{theme: 'colored'})
        }else if(data.name === "AxiosError"){
          return toast.error("Something went wrong!",{theme: 'colored'})
        }

        setImage(data.data)
      }).catch(err=>{

      })
    },[])

    const cld = new Cloudinary({
      cloud: {
        cloudName: process.env.REACT_APP_CLDNAME
      }
    })


    useEffect(()=>{
      if(image.images){
        let hei,wid
        if(image.images.height > image.images.width){
          hei = 850
          wid = 500
        }else{
          hei = 500
          wid = 850
        }

        const temp = cld.image(image.images.thumbId)
        .resize(thumbnail().width(wid).height(hei))
        .format("auto").quality("auto")

        setCldImage(temp)
      }
    },[image])
  return (
    <div>
      <Header currentLocation={"home"} />
      <div className='w-screen h-screen fixed top-0 left-0 blur-2xl z-0'>
        <AdvancedImage className="w-full h-full object-cover" cldImg={cldImage} plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.25})]} />
      </div>
      <div className='w-[calc(100vw_-_60px)] z-10 h-[calc(100vh_-_90px)] mt-[80px] flex justify-between mx-[30px]'>
        {
          image.images && (
            <FullviewImage image={cldImage} height={image.images.height} width={image.images.width} />
          )
        }
        <div className='w-full z-10 relative top-0'>
          {
            image.images && (
              <ImageInfo data={image} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ExtendedImage