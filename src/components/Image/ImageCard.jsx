import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Cloudinary} from '@cloudinary/url-gen'
import {AdvancedImage, lazyload} from '@cloudinary/react'
import {thumbnail} from "@cloudinary/url-gen/actions/resize"
import {FilterContext} from '../../context/FilterContext'
import { CgClose } from 'react-icons/cg'
import { removeAssetFromCollection } from '../user/helper/userApiCalls'
import { isAuthenticated } from '../../utils/LS_Helper'
import { toast } from 'react-toastify'
import { BiLoaderAlt } from 'react-icons/bi'

const ImageCard = ({image}) => {
  const [isLoading,setIsLoading] = useState(false)
  const [filters,setFilters] = useContext(FilterContext)
  const {user,token} = isAuthenticated()

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLDNAME
    }
  })
  let hei,wid
  if(image.images.height > image.images.width){
    hei = 440
    wid = 250
  }else{
    hei = 250
    wid = 440
  }

  const cldImage = cld.image(image.images.thumbId)
  .resize(thumbnail().width(wid).height(hei))
  .format("auto").quality("auto")

  const handleRemoveFromCollection = e => {
    setIsLoading(true)
    removeAssetFromCollection(image._id,user._id,token).then(data=>{
      if(data?.response?.data?.error){
        setIsLoading(false)
        return toast.error(data?.response?.data?.error,{theme: 'colored'})
      }else if(data.name === "AxiosError"){
        setIsLoading(false)
        console.log(data)
        return toast.error(data.response.statusText,{theme: 'colored'})
      }
      setIsLoading(false)
      return toast.success("Removed from collection.Refresh to update!",{theme: 'colored'})
    }).catch(e=>{
      console.log(e)
      setIsLoading(false)
      return toast.error("Something went wrong! Chcek logs.",{theme: 'colored'})
    })
  }

  return (
    <div className={`${filters.view === "compact" ? ('h-[150px]') 
    : filters.view === "small" ? ('h-[100px]') 
    : filters.view === "large" ? ('h-[300px]') : 'h-[200px]'} relative top-0 flex-auto`}>
      {
        window.location.pathname === '/collections' && (
          <div onClick={handleRemoveFromCollection} className='z-[1] cursor-pointer rounded-bl rounded-tr absolute top-0 right-0 w-[50px] h-[50px] flex items-center justify-center text-[30px] bg-red-600 hover:bg-red-500'>
            {
              isLoading ? (
                <BiLoaderAlt className='animate-spin' />
              ) : (
                <CgClose />
              )
            }  
          </div>
        )
      }
      <Link to={`/asset/${image._id}`} className='flex-auto'>
      <div className={`${filters.view === "compact" ? ('h-[150px]') 
          : filters.view === "small" ? ('h-[100px]') 
          : filters.view === "large" ? ('h-[300px]') : 'h-[200px]'} flex-auto  rounded bg-emerald-200 relative top-0`}>
          <h6 className='absolute select-none top-[10px] left-[10px] rounded bg-white px-[10px]'>{image.isFree ? ("Free") : ("Paid")}</h6> {/* Image Format Here */}
          <AdvancedImage className="h-[100%] w-full object-cover rounded cursor-pointer" cldImg={cldImage} plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.25})]} />
          <h6 className='text-white select-none text-overflow-hidden overflow-hidden absolute left-0 bottom-0 w-[100%] h-[25px] bg-[#00000073] indent-[10px]'>By {image.author.name ? image.author.name : 'Imagerr'}</h6>
      </div>
      </Link>    
    </div>

  )
}

export default ImageCard