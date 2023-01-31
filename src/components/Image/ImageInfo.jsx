import React from 'react'
import {IoMdPricetag} from 'react-icons/io'
import {RxDimensions} from 'react-icons/rx'
import {BiCategory} from 'react-icons/bi'
import {MdMemory} from 'react-icons/md'
import {AiOutlineFileJpg,AiOutlineTags} from 'react-icons/ai'
import {FaUserCircle,FaDownload} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ImageInfo = ({data}) => {
  return (
    <div className={`${data.width > data.height ? ('w-[100%]') : ('w-[100%]')} relative top-0  h-[100%] z-10 bg-zinc-300 dark:bg-zinc-900 rounded-r-md`}>
      <h1 className='ml-[20px] pt-[10px] text-[30px] dark:text-zinc-100 text-zinc-900 select-none'>{data.title}</h1>
      <h1 className='ml-[20px] pt-[10px] text-[20px] dark:text-zinc-300 text-zinc-800 select-none flex items-center gap-[10px] mt-[20px]'><IoMdPricetag /> {data.isFree ? ('Free') : 'Rs. '+data.price}</h1>
      <h1 className='ml-[20px] pt-[10px] text-[20px] dark:text-zinc-300 text-zinc-800 select-none flex items-center gap-[10px] mt-[5px]'><RxDimensions /> {data.width +' X '+data.height} (pexels)</h1>
      <h1 className='ml-[20px] pt-[10px] text-[20px] dark:text-zinc-300 text-zinc-800 select-none flex items-center gap-[10px] mt-[5px]'><BiCategory /> {data.category}</h1>
      <h1 className='ml-[20px] pt-[10px] text-[20px] dark:text-zinc-300 text-zinc-800 select-none flex items-center gap-[10px] mt-[5px]'><MdMemory /> {data.size > 1024 ? (data.size/1024 + " mb "): data.size+" kb"}</h1>
      <h1 className='ml-[20px] pt-[10px] text-[20px] dark:text-zinc-300 text-zinc-800 select-none flex items-center gap-[10px] mt-[5px]'><AiOutlineFileJpg /> {data.format}</h1>
      <h1 className='mx-[20px] pt-[10px] text-[20px] dark:text-zinc-300 text-zinc-800 select-none flex items-center gap-[10px] mt-[5px] flex-wrap min-h-max max-h-[80px] overflow-hidden'><AiOutlineTags /> {data.tags.map((tag,index)=>(
        <span key={index} className='px-[10px] overflow-hidden h-[30px] rounded-md bg-amber-300 dark:bg-amber-700'>{tag}</span>
      ))}</h1>
      <Link to={`/collections/${data.author._id}`}>
        <h1 className='ml-[20px] pt-[10px] text-[20px] dark:text-zinc-300 text-zinc-800 select-none flex items-center gap-[10px] mt-[5px]'><FaUserCircle /> <span className='underline'>{data.author} <span className='text-[14px]'>(view all)</span></span></h1>
      </Link>

        {
          data.isFree ? (
            <button className='absolute bottom-[20px] mx-[20px] h-[40px] rounded-md shadow-md w-[calc(100%_-_40px)] bg-emerald-500 text-[22px] text-white font-[500] flex items-center justify-center gap-[10px]'>Download <FaDownload /> </button>              
          ) : (
            <button className='absolute bottom-[20px] mx-[20px] h-[40px] rounded-md shadow-md w-[calc(100%_-_40px)] bg-emerald-500 text-[22px] text-white font-[500] flex items-center justify-center gap-[10px]'>Buy Now <FaDownload /> </button>              
          )
        }

    </div>
  )
}

export default ImageInfo