import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {FilterContext} from '../../context/FilterContext'

const ImageCard = ({img,author}) => {
  const [filters,setFilters] = useContext(FilterContext)
  return (
    <div className={`${filters.view === "compact" ? ('h-[150px]') 
        : filters.view === "small" ? ('h-[100px]') 
        : filters.view === "large" ? ('h-[300px]') : ''} flex-auto  h-[200px] rounded bg-emerald-200 relative top-0`}>
        <h6 className='absolute select-none top-[10px] left-[10px] rounded bg-white px-[10px]'>JPG</h6> {/* Image Format Here */}
        <img src={img} alt="" className='h-[100%] w-full object-cover rounded cursor-pointer' />

        <h6 className='text-white select-none text-overflow-hidden overflow-hidden absolute left-0 bottom-0 w-[100%] h-[25px] bg-[#00000073] indent-[10px]'>By Swayangdipta Das</h6>
    </div>
  )
}

export default ImageCard