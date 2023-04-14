import React, { useContext, useEffect } from 'react'
import ImageCard from './ImageCard'
import {ImageContext} from '../../context/ImageContext'
import { SearchResultContext } from '../../context/SearchResultContext'
import { FilterContext } from '../../context/FilterContext'
import { CategorizedImageContext } from '../../context/CategorizedImageContext'

const ImageContainer = () => {
  const [images,setImages] = useContext(ImageContext)
  const [filters,setFilters] = useContext(FilterContext)
  const [searchedImages,setSearchedImages] = useContext(SearchResultContext)
  const [categorizedImages,SetCategorizedImages] = useContext(CategorizedImageContext)
  useEffect(()=>{
    console.log(filters.category);
  },[filters.category])
  return (
    <div className='w-[100%] h-[calc(100vh_-_90px)] overflow-x-hidden overflow-y-scroll flex flex-wrap items-start gap-[10px] gap-x-auto gap-y-[10px] pb-[30px]'>
      {
        searchedImages.length > 0 ? searchedImages[0] === 404 ? (
          <h4 className='text-[34px] dark:text-zinc-500 text-zinc-700 font-[500] '>No images found</h4>
        ) : (
          searchedImages.map((image,index) => (
            <ImageCard image={image} key={index} />
          ))
        ) : filters.category === "all" ? 
        images.length > 0 && images.map((image,index) => (
          <ImageCard image={image} key={index} />
        )) : categorizedImages.length > 0 ? (
          categorizedImages.map((image,index) => (
            <ImageCard image={image} key={index} />
          ))
        ) : (
          <h4 className='text-[34px] dark:text-zinc-500 text-zinc-700 font-[500] '>No images in this category</h4>
        )
      }
    </div>
  )
}

export default ImageContainer