import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Cloudinary} from '@cloudinary/url-gen'
import {AdvancedImage, lazyload} from '@cloudinary/react'
import {thumbnail} from "@cloudinary/url-gen/actions/resize"
import Header from '../base/Header'
import FullviewImage from './FullviewImage'
import ImageInfo from './ImageInfo'
import { getASingleImage } from './helper/imageApiCalls'
import { toast } from 'react-toastify'
import { BiLoaderAlt } from 'react-icons/bi'
import { FaCartPlus } from 'react-icons/fa'
import { addAssetToUserCollection } from '../user/helper/userApiCalls'
import { isAuthenticated } from '../../utils/LS_Helper'

const ExtendedImage = () => {
    const [image,setImage] = useState({})
    const [cldImage,setCldImage] = useState('')
    const [isLoading,setIsloading] = useState(false)
    const {id} = useParams()

    const {user,token} = isAuthenticated()

    useEffect(()=>{
      getASingleImage(id).then(data=>{
        if(data?.response?.data?.error){
          return toast.error(data?.response?.data?.error,{theme: 'colored'})
        }else if(data.name === "AxiosError"){
          return toast.error("Something went wrong!",{theme: 'colored'})
        }

        setImage(data.data)
      }).catch(err=>{
        return toast.error("Something went wrong!",{theme: 'colored'})
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

    const handleAddToCollection = event => {
      setIsloading(true)
      addAssetToUserCollection(user._id,token,image._id).then(data=>{
        if(data?.response?.data?.error){
          setIsloading(false)
          return toast.error(data?.response?.data?.error,{theme: 'colored'})
        }else if(data.name === "AxiosError"){
          setIsloading(false)
          return toast.error("Something went wrong!",{theme: 'colored'})
        }
          toast.success("Added to your collection.",{theme: 'colored'})
          setIsloading(false)
      }).catch(e=>{
        setIsloading(false)
        return toast.error("Something went wrong!",{theme: 'colored'})
      })
    }
  return (
    <div>
      <Header currentLocation={"collection"} />
      <div className='w-screen h-screen fixed top-0 left-0 blur-2xl z-0'>
        <AdvancedImage className="w-full h-full object-cover" cldImg={cldImage} plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.25})]} />
      </div>
      <div className='w-[calc(100vw_-_60px)] z-10 h-[calc(100vh_-_90px)] mt-[80px] flex justify-between mx-[30px] relative top-0'>
        {
          image.images && user && (
            <div onClick={handleAddToCollection} className='absolute top-0 left-0 w-[70px] h-[70px] flex items-center justify-center bg-emerald-500 rounded-tl-md rounded-br-md hover:shadow-xl cursor-pointer z-[100]'>
              {
                isLoading ? (
                  <BiLoaderAlt className='text-[36px] text-zinc-100 animate-spin' />
                ) : (
                  <FaCartPlus className='text-[36px] text-zinc-100' />
                )
              }
            </div>
          )
        }
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