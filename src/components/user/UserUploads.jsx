import React, { useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import ImageCard from '../Image/ImageCard'

const UserUploads = ({data}) => {
    const [isExpanded,setIsExpanded] = useState(true)
  return (
    <div className='w-screen mt-[50px]'>
        <div className='select-none w-[90%] h-[50px] text-[24px] font-[500] mx-auto flex items-center justify-between rounded-t-md dark:bg-zinc-900 bg-zinc-100 border dark:border-0 border-zinc-400 text-zinc-900 dark:text-zinc-100'>
            <h1 className='ml-[30px]'>My Uploads</h1>
            {
                isExpanded ? (<MdKeyboardArrowUp onClick={e=>setIsExpanded(false)} className='cursor-pointer text-[40px] mr-[20px]' />) : (<MdKeyboardArrowDown onClick={e=>setIsExpanded(true)} className='cursor-pointer text-[40px] mr-[20px]' />)
            }
        </div>
        <div className={`select-none w-[90vw] px-[20px] overflow-x-hidden  ${isExpanded ? ('h-max py-[30px] border') : ('h-0 border-0 hidden ')} font-[500] mx-auto flex flex-wrap items-start gap-[10px] gap-x-auto gap-y-[10px] rounded-b-md dark:bg-zinc-700 border dark:border-0 border-zinc-400`}>
            {
                data.length > 0 ? data.map((element,index)=>(
                    <ImageCard image={element} key={index} />
                )) : (<h1 className='text-center text-zinc-600 dark:text-700 ml-[30px]'>Upload some asset to view</h1>)
            }
        </div>
    </div>
  )
}

export default UserUploads