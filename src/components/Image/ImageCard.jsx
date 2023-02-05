import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {Cloudinary} from '@cloudinary/url-gen'
import {AdvancedImage, lazyload} from '@cloudinary/react'
import {thumbnail} from "@cloudinary/url-gen/actions/resize"
import {FilterContext} from '../../context/FilterContext'

const ImageCard = ({image}) => {
  const [filters,setFilters] = useContext(FilterContext)

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
  return (
    <Link to={`/asset/${image._id}`} className='flex-auto'>
    <div className={`${filters.view === "compact" ? ('h-[150px]') 
        : filters.view === "small" ? ('h-[100px]') 
        : filters.view === "large" ? ('h-[300px]') : 'h-[200px]'} flex-auto  rounded bg-emerald-200 relative top-0`}>
        <h6 className='absolute select-none top-[10px] left-[10px] rounded bg-white px-[10px]'>{image.isFree ? ("Free") : ("Paid")}</h6> {/* Image Format Here */}
        <AdvancedImage className="h-[100%] w-full object-cover rounded cursor-pointer" cldImg={cldImage} plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.25})]} />
        <h6 className='text-white select-none text-overflow-hidden overflow-hidden absolute left-0 bottom-0 w-[100%] h-[25px] bg-[#00000073] indent-[10px]'>By {image.author.name ? image.author.name : 'Imagerr'}</h6>
    </div>
    </Link>
  )
}

export default ImageCard